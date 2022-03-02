package zula.netty.inbound.httpclint;

import io.netty.channel.ChannelHandlerContext;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestInfo {
    private Object msg;
    private ChannelHandlerContext ctx;
}
