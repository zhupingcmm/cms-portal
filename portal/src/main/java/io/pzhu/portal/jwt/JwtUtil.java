package io.pzhu.portal.jwt;

import org.springframework.util.ObjectUtils;

import javax.servlet.http.HttpServletRequest;

public class JwtUtil {
    private static final String AUTHORIZATION = "Authorization";
    public static String getTokenFormHeader(HttpServletRequest request) {
        String token = null;
        String authorization = request.getHeader(AUTHORIZATION);
        if (!ObjectUtils.isEmpty(authorization)) {
            token = authorization.replace("Bearer","").replace("\"","").trim();
        }
        return token;
    }
}
