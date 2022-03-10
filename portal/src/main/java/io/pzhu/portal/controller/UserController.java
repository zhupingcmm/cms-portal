package io.pzhu.portal.controller;

import io.pzhu.portal.entity.User;
import io.pzhu.portal.jwt.PassToken;
import io.pzhu.portal.service.UserService;
import io.pzhu.portal.vo.UserRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public ResponseEntity<User> addUser(@RequestBody UserRequest request) {
        log.info("try to create {} user.", request.getUsername());
        return ResponseEntity.ok(userService.addUser(request.toUser()));
    }

    @GetMapping("/user")
    @PassToken
    public ResponseEntity<User> findByName(@RequestParam String name){
        log.info("try to get {} user info.", name);
        return ResponseEntity.ok(userService.findByName(name));
    }

    @GetMapping("/users")
    @PassToken
    public ResponseEntity<List<User>> getUsers(@RequestParam(required = false) String username, @RequestParam(required = false) String email, @RequestParam(required = false) String id) {
        log.info("try to get all users info");
        List<User> users = userService.findAll();
        List<User> result= users.stream()
                .filter(user -> {
                    if (!ObjectUtils.isEmpty(username)) {
                        return user.getUsername().contains(username);
                    }
                    return true;
                })
                .filter(user -> {
                    if (!ObjectUtils.isEmpty(email)) {
                        return user.getEmail().contains(email);
                    }
                    return true;
                })
                .filter(user -> {
                    if (!ObjectUtils.isEmpty(id)) {
                        return user.getId() == Integer.parseInt(id);
                    }
                    return  true;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }
}
