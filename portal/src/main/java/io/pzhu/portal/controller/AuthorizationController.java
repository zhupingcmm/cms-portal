package io.pzhu.portal.controller;

import io.pzhu.portal.entity.User;
import io.pzhu.portal.jwt.JwtConfig;
import io.pzhu.portal.service.UserService;
import io.pzhu.portal.vo.UserRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
public class AuthorizationController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtConfig jwtConfig;

    @PostMapping("/token")
    public ResponseEntity<Map<String,String>> getToken (@RequestBody UserRequest request, HttpServletResponse response) {
        log.info("{} is try to login", request.getUsername());
//        Cookie cookie = new Cookie("token", "abcccbbbbb");
//        response.addCookie(cookie);
//        return ResponseEntity.ok("abcccbbbbb");
        try {
            User user = userService.findByName(request.getUsername());
            if (ObjectUtils.isEmpty(user)) {
                // user is not exit
                log.warn("{} is not found ", request.getUsername());
                return ResponseEntity.notFound().build();
            }

            String token = jwtConfig.getTokenMap().get(user.getUsername());
            if (ObjectUtils.isEmpty(token) || jwtConfig.isTokenExpired(jwtConfig.getExpirationDateFromToken(token))) {
                token = jwtConfig.createToken(user.getUsername());
                log.info("Create a new token for {}", user.getUsername());
            }
            Map<String, String> map = new HashMap<>();
            map.put("token", token);
            return ResponseEntity.ok(map);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }

}
