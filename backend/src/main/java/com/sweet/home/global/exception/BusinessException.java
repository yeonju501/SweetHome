package com.sweet.home.global.exception;

public class BusinessException extends CustomException {

    public BusinessException(ErrorCode errorCode) {
        super(errorCode);
    }
}
