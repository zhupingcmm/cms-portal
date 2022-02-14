package io.pzhu.portal.controller;

import io.pzhu.portal.entity.User;
import io.pzhu.portal.jwt.JwtConfig;
import io.pzhu.portal.jwt.JwtUtil;
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
    public ResponseEntity<UserRequest> getToken (@RequestBody UserRequest request, HttpServletResponse response) {
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
            UserRequest result = UserRequest.builder()
                    .username(request.getUsername())
                    .department(request.getDepartment())
                    .email(request.getEmail())
                    .token(token)
                    .build();
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }

    @GetMapping("/me")
    public ResponseEntity<UserRequest> getMeInfo(@RequestHeader(value = "Authorization") String authorization) {
        try {
            String token = JwtUtil.parseToken(authorization);
            log.debug("{} is try to get user info", token);
            String userName = jwtConfig.getUsernameFromToken(token);
            User user = userService.findByName(userName);
            UserRequest userRequest = UserRequest.builder()
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .department(user.getDepartment())
                    .build();
            return ResponseEntity.ok(userRequest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }

}
