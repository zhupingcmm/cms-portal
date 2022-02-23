package io.pzhu.portal.exception;

import lombok.Data;

@Data
public class ExceptionResult {
    private int code;
    private String msg;
    private Long timestamp;

    public ExceptionResult(ExceptionEnum em) {
        this.code = em.getCode();
        this.msg = em.getMsg();
        this.timestamp = System.currentTimeMillis();
    }
}
