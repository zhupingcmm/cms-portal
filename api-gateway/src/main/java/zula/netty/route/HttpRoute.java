package zula.netty.route;

import org.springframework.stereotype.Component;

@Component
public class HttpRoute {
    public String getRemoteUrl(String uri) {
        StringBuilder url = null;
        String [] paths = parseUrl(uri);
        String serviceName = paths[1];
        for (ServiceEnum serviceEnum : ServiceEnum.values()){
            if (serviceEnum.getServiceName().equals(serviceName)){
                url = new StringBuilder("http://" + serviceEnum.getHostName() + ":" + serviceEnum.getPort());
                if (paths.length > 2) {
                    for (int i = 2; i < paths.length; i++) {
                        url.append("/").append(paths[i]);
                    }
                }
                break;
            }
        }
        assert url != null;
        return url.toString();
    }

    private String[] parseUrl (String uri) {
        return uri.split("/");
    }
}
