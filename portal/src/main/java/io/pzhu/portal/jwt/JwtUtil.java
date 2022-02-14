package io.pzhu.portal.jwt;

import org.springframework.util.ObjectUtils;

import javax.servlet.http.HttpServletRequest;

public class JwtUtil {
    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer";

    public static String getTokenFormHeader(HttpServletRequest request) {
        String token = null;
        String authorization = request.getHeader(AUTHORIZATION);
        if (!ObjectUtils.isEmpty(authorization)) {
            token = authorization.replace(BEARER,"").replace("\"","").trim();
        }
        return token;
    }

    public static String parseToken(String authorization) {
        return authorization.replace(BEARER,"").replace("\"","").trim();
    }
}
