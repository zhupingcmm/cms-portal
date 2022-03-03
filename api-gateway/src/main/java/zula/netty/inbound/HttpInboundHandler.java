package zula.netty.inbound;


import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.util.ReferenceCountUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import zula.netty.inbound.httpclint.HttpClientHandler;
import zula.netty.inbound.httpclint.RequestInfo;
import zula.netty.inbound.httpclint.RequestQueue;

@Component
@ChannelHandler.Sharable
public class HttpInboundHandler extends ChannelInboundHandlerAdapter {

    @Autowired
    private HttpClientHandler httpClientHandler;

    @Autowired
    private RequestQueue<RequestInfo> requestQueue;


    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) {
        ctx.flush();
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) {
        try {
            if (requestQueue.size() > 100 ) {
                throw new RuntimeException("Queue size is 100, and the queue is reach the limit!!!!");
            }
            RequestInfo requestInfo = RequestInfo.builder()
                    .msg(msg)
                    .ctx(ctx)
                    .build();
            System.out.println("queue size is:" + requestQueue.size() + " and put one request to the queue.");
            requestQueue.produce(requestInfo);
            httpClientHandler.handle();

        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            ReferenceCountUtil.release(msg);
        }
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }
}
