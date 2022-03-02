package zula.netty.outbound;

import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelOutboundHandlerAdapter;
import io.netty.channel.ChannelPromise;
import org.springframework.stereotype.Component;

@Component
@ChannelHandler.Sharable
public class HttpOutBoundHandler extends ChannelOutboundHandlerAdapter {
    @Override
    public void read(ChannelHandlerContext ctx) throws Exception {
//        System.out.println("HttpOutBoundHandler read a message");
        super.read(ctx);
    }

    @Override
    public void write(ChannelHandlerContext ctx, Object msg, ChannelPromise promise) throws Exception {
//        System.out.println("HttpOutBoundHandler write a message");
        super.write(ctx, msg, promise);
    }
}
