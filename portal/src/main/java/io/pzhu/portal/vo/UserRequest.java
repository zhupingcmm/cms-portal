package io.pzhu.portal.vo;

import io.pzhu.portal.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserRequest {
    private String username;
    private String password;
    private String email;
    private String department;
    private String token;

    public User toUser(){
        return User.builder()
                .username(username)
                .department(department)
                .password(password)
                .email(email)
                .build();
    }

}
