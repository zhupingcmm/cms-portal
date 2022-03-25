package io.pzhu.portal.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ExceptionEnum {


    UNAUTHORIZED("", 401),
    FORBIDDEN("forbidden request", 403),
    INVALID_USER("invalid user", 400);



    private String msg;
    private int code;
}
