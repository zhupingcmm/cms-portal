package zula.netty.route;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ServiceEnum {
    PORTAL("portal", "localhost", 8091);
    private String serviceName;
    private String hostName;
    private int port;
}
