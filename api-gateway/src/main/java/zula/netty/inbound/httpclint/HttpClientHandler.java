package zula.netty.inbound.httpclint;

import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.FullHttpResponse;
import io.netty.handler.codec.http.HttpUtil;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.concurrent.FutureCallback;
import org.apache.http.impl.nio.client.CloseableHttpAsyncClient;
import org.apache.http.impl.nio.client.HttpAsyncClients;
import org.apache.http.impl.nio.reactor.IOReactorConfig;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import zula.netty.route.HttpRoute;

import java.util.concurrent.*;

import static io.netty.handler.codec.http.HttpResponseStatus.NO_CONTENT;
import static io.netty.handler.codec.http.HttpResponseStatus.OK;
import static io.netty.handler.codec.http.HttpVersion.HTTP_1_1;

@Component
public class HttpClientHandler {
    private CloseableHttpAsyncClient client;
    private ExecutorService proxyServices;

    @Autowired
    private HttpRoute httpRoute;

    @Autowired
    private RequestQueue<RequestInfo> requestQueue;

    public HttpClientHandler () {
        int cores = Runtime.getRuntime().availableProcessors();
        int keepAliveTime = 10000;
        int queueSize = 2048;

        RejectedExecutionHandler handler = new ThreadPoolExecutor.CallerRunsPolicy();
        proxyServices = new ThreadPoolExecutor(cores, cores, keepAliveTime,
                TimeUnit.MILLISECONDS, new ArrayBlockingQueue<>(queueSize),
                new NamedThreadFactory("proxyService"), handler);

        IOReactorConfig config = IOReactorConfig.custom()
                .setConnectTimeout(10000)
                .setSoTimeout(10000)
                .setIoThreadCount(cores)
                .setRcvBufSize(32 * 1024)
                .build();
        client = HttpAsyncClients.custom().setMaxConnTotal(40)
                .setMaxConnPerRoute(8)
                .setDefaultIOReactorConfig(config)
                .setKeepAliveStrategy((response,context) -> 6000)
                .build();
        client.start();
    }

    public void handle () {
        System.out.println("queue size is:" + requestQueue.size() + " and consume one request from queue.");
        RequestInfo requestInfo = requestQueue.consume();
        if (requestInfo != null) {

            ChannelHandlerContext ctx = requestInfo.getCtx();
            FullHttpRequest fullHttpRequest = (FullHttpRequest) requestInfo.getMsg();
            String url = httpRoute.getRemoteUrl(fullHttpRequest.uri());
            String methodName = fullHttpRequest.method().name();
            switch (methodName) {
                case "GET":
                    proxyServices.submit(() -> fetchGet(fullHttpRequest, ctx, url));
                    break;
                case "POST":
                    proxyServices.submit(() -> fetchPost(fullHttpRequest, ctx, url));
                    break;
                default:
                    System.out.println("can not find the right method");

            }

        }
    }

    private void fetchPost(final FullHttpRequest request, final ChannelHandlerContext ctx, final String url) {
        final HttpPost httpPost = new HttpPost(url);
        httpPost.setHeader(HTTP.CONTENT_TYPE, "application/json");
        client.execute(httpPost, new FutureCallback<HttpResponse>() {
            @Override
            public void completed(HttpResponse response) {
                try {
                    handleResponse(request, ctx, response);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void failed(Exception e) {
                httpPost.abort();
                e.printStackTrace();
            }

            @Override
            public void cancelled() {
                httpPost.abort();
            }
        });


    }

    private void fetchGet(final FullHttpRequest inbound, final ChannelHandlerContext ctx, final String url) {
        final HttpGet httpGet = new HttpGet(url);
        //httpGet.setHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_CLOSE);
        httpGet.setHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
        httpGet.setHeader(HTTP.CONTENT_TYPE, "application/json");
        httpGet.setHeader("mao", inbound.headers().get("mao"));

        client.execute(httpGet, new FutureCallback<HttpResponse>() {
            @Override
            public void completed(final HttpResponse endpointResponse) {
                try {
                    handleResponse(inbound, ctx, endpointResponse);
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                }
            }

            @Override
            public void failed(final Exception ex) {
                httpGet.abort();
                ex.printStackTrace();
            }

            @Override
            public void cancelled() {
                httpGet.abort();
            }
        });
    }

    private void handleResponse(final FullHttpRequest fullRequest, final ChannelHandlerContext ctx, final HttpResponse endpointResponse) throws Exception {
        FullHttpResponse response = null;
        try {
            byte[] body = EntityUtils.toByteArray(endpointResponse.getEntity());

            response = new DefaultFullHttpResponse(HTTP_1_1, OK, Unpooled.wrappedBuffer(body));

            response.headers().set("Content-Type", "application/json");

        } catch (Exception e) {
            e.printStackTrace();
            response = new DefaultFullHttpResponse(HTTP_1_1, NO_CONTENT);
        } finally {
            if (fullRequest != null) {
                if (!HttpUtil.isKeepAlive(fullRequest)) {
                    ctx.write(response).addListener(ChannelFutureListener.CLOSE);
                } else {
                    //response.headers().set(CONNECTION, KEEP_ALIVE);
                    ctx.write(response);
                }
            }
            ctx.flush();
            ctx.close();
        }

    }
}
