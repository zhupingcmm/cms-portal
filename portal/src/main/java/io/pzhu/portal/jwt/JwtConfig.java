package io.pzhu.portal.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class JwtConfig {
    private final String SECRET = "cms-portal";
    private final String HEADER = "token";

    private static final Map<String, String> tokenMap =  new HashMap<>();

    public String createToken(String subject) {
        Date now = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);
        calendar.add(Calendar.DAY_OF_MONTH, 10);
        Date expireDate = calendar.getTime();

        String userToken = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
        tokenMap.put(subject, userToken);
        return userToken;
    }


    public Claims getTokenClaim(String token) {
        try{
            return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public boolean isTokenExpired(Date expirationTime) {
        return expirationTime.before(new Date());
    }

    public Date getExpirationDateFromToken(String token) {
        return getTokenClaim(token).getExpiration();
    }

    /**
     * 获取用户名从token中
     */
    public String getUsernameFromToken(String token) {
        return getTokenClaim(token).getSubject();
    }
    /**
     * 获取jwt发布时间
     */
    public Date getIssuedAtDateFromToken(String token) {
        return getTokenClaim(token).getIssuedAt();
    }

    public Map<String, String> getTokenMap() {
        return tokenMap;
    }

}
