package zula.netty.channel;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import zula.netty.inbound.HttpInboundHandler;
import zula.netty.inbound.httpclint.HttpClientHandler;
import zula.netty.outbound.HttpOutBoundHandler;

@Component
public class HttpChannel extends ChannelInitializer<SocketChannel> {
    @Autowired
    private HttpInboundHandler httpInboundHandler;
    @Autowired
    private HttpOutBoundHandler httpOutBoundHandler;

    @Autowired
    private HttpClientHandler httpClientHandler;

    @Override
    public void initChannel(SocketChannel ch) {
        ChannelPipeline p = ch.pipeline();
        p.addLast(new HttpServerCodec());
        //p.addLast(new HttpServerExpectContinueHandler());
        p.addLast(new HttpObjectAggregator(1024 * 1024));
        p.addLast(httpOutBoundHandler);
        p.addLast(httpInboundHandler);
    }
}
