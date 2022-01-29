package com.sweet.home.global.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    // authentication
    INVALID_EXPIRED_JWT(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),
    INVALID_MALFORMED_JWT(HttpStatus.UNAUTHORIZED, "잘못된 토큰 서명입니다."),
    INVALID_UNSUPPORTED_JWT(HttpStatus.UNAUTHORIZED, "지원하지 않는 토큰입니다."),
    INVALID_ILLEGAL_ARGUMENT_JWT(HttpStatus.UNAUTHORIZED, "토큰이 잘못되었습니다."),
    INVALID_LOGOUT_USER_JWT(HttpStatus.UNAUTHORIZED, "로그아웃된 유저입니다."),
    INVALID_NOT_FOUND_REFRESH_TOKEN(HttpStatus.NOT_FOUND, "리프래시 토큰이 존재하지 않습니다."),
    INVALID_NOT_MATCH_BY_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "리프래시 토큰이 일치하지 않습니다."),

    // authority
    AUTHORITY_NOT_FOUND_BY_AUTHORITY_CODE(HttpStatus.NOT_FOUND, "존재하지 않는 권한코드입니다."),

    // member
    MEMBER_NOT_FOUND_BY_EMAIL(HttpStatus.NOT_FOUND, "존재하지 않는 유저의 이메일입니다."),
    MEMBER_NOT_FOUND_BY_USERNAME(HttpStatus.NOT_FOUND, "존재하지 않는 유저의 이름입니다."),
    MEMBER_LOGIN_ERROR_BY_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않는 유저입니다."),

    MEMBER_EMAIL_DUPLICATED(HttpStatus.CONFLICT, "이미 중복된 이메일의 회원 정보가 존재합니다."),

    //message
    MESSAGE_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 메시지 ID 입니다."),
    MESSAGE_NOT_MATCH_BY_MEMBER_ID(HttpStatus.BAD_REQUEST, "메시지 송수신자와 일치하지 않는 유저입니다."),
    MESSAGE_NOT_MATCH_BY_MEMBER_EMAIL(HttpStatus.BAD_REQUEST, "메시지 송수신자와 일치하지 않는 이메일입니다."),

    // board
    BOARD_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 게시판입니다."),

    // article
    ARTICLE_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 게시글입니다."),
    ARTICLE_NOT_MATCH_BY_EMAIL(HttpStatus.BAD_REQUEST, "게시글 작성자와 일치하지 않는 이메일입니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;

    ErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getMessage() {
        return message;
    }
}
