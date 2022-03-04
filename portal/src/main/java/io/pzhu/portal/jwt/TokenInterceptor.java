package io.pzhu.portal.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.pzhu.portal.entity.User;
import io.pzhu.portal.redis.RedisOperator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

@Component
@Slf4j
public class TokenInterceptor implements HandlerInterceptor {

    private static final List<String> SPECIAL_URL = Arrays.asList("/token", "/user");

    @Resource(name = "jwtConfig")
    private JwtConfig jwtConfig;

    @Autowired
    private RedisOperator<String, User> redisOperator;


    private String getTokenByUserName(String userName) {
        User user = redisOperator.get("userCache::" + userName);
        return user.getToken();
    }


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        try {
            String uri = request.getRequestURI();

            if (handler instanceof HandlerMethod) {
                HandlerMethod handlerMethod = (HandlerMethod) handler;

                Method method = handlerMethod.getMethod();

                if (method.isAnnotationPresent(PassToken.class)) {
                    PassToken passToken = method.getAnnotation(PassToken.class);
                    return passToken.value();
                } else {
                    if (SPECIAL_URL.contains(uri) && method.isAnnotationPresent(PostMapping.class)) return true;
                    String token = JwtUtil.getTokenFormHeader(request);
                    if (ObjectUtils.isEmpty(token)){
                        response.sendError(401, "token is empty");
                        return false;
                    }

                    String userName = jwtConfig.getUsernameFromToken(token);
                    String tokenFromCache = getTokenByUserName(userName);

                    if (!ObjectUtils.isEmpty(tokenFromCache) && !tokenFromCache.equals(token)) {
                        response.sendError(400, "token is wrong");
                        return false;
                    }
                    Claims claims = null;
                    try {
                        claims = jwtConfig.getTokenClaim(token);
                        if (claims == null || jwtConfig.isTokenExpired(token)) {
                            response.sendError(400, "token is already expired, please retry to login");
                            return false;
                        }
                    } catch (Exception e) {
                        response.sendError(400, "token is already expired, please retry to login");
                        return false;

                    }
                    request.setAttribute("identityId", claims.getSubject());
                    return true;
                }
            }
        } catch (Exception e) {
            if (e instanceof ExpiredJwtException) {
                log.error("token is expired");
                try {
                    response.sendError(401, "token is expired");
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
            return false;
        }
        return true;
    }
}
