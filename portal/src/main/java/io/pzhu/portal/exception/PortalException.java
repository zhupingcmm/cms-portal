package io.pzhu.portal.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PortalException extends RuntimeException{
    private ExceptionEnum exceptionEnum;
}
