package io.pzhu.portal.jwt;

import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

@Component
public class TokenInterceptor implements HandlerInterceptor {

    private static final List<String> SPECIAL_URL = Arrays.asList("/token");

    @Resource(name = "jwtConfig")
    private JwtConfig jwtConfig;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String uri = request.getRequestURI();
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;

            Method method = handlerMethod.getMethod();

            if (method.isAnnotationPresent(PassToken.class)) {
                PassToken passToken = method.getAnnotation(PassToken.class);
                return passToken.value();
            } else {
                if (SPECIAL_URL.contains(uri)) return true;
                String token = JwtUtil.getTokenFormHeader(request);
                if (ObjectUtils.isEmpty(token)){
                    response.sendError(401, "token is empty");
                    return false;
                }

                String userName = jwtConfig.getUsernameFromToken(token);
                String tokenFromCache = jwtConfig.getTokenMap().get(userName);

                if (!ObjectUtils.isEmpty(tokenFromCache) && !tokenFromCache.equals(token)) {
                    response.sendError(400, "token is wrong");
                    return false;
                }
                Claims claims = null;
                try {
                    claims = jwtConfig.getTokenClaim(token);
                    if (claims == null || jwtConfig.isTokenExpired(claims.getExpiration())) {
                        response.sendError(400, "token is already expired, please retry to login");
                        return false;
                    }
                } catch (Exception e) {
                    response.sendError(400, "token is already expired, please retry to login");
                    return false;

                }
                request.setAttribute("identityId", claims.getSubject());
                if (tokenFromCache == null) {
                    jwtConfig.getTokenMap().put(userName, token);
                }
                return true;
            }
        }

        return true;
    }
}
