package io.pzhu.portal.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ExceptionEnum {


    UNAUTHORIZED("", 401),
    FORBIDDEN("", 403);

    private String msg;
    private int code;
}
