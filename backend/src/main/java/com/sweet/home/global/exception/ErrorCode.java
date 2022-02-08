package com.sweet.home.global.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    // global
    GLOBAL_ILLEGAL_ERROR(HttpStatus.BAD_REQUEST, "ILLEGAL 에러입니다.", "Z01"),
    GLOBAL_INTERNAL_SERVER_ERROR(HttpStatus.BAD_REQUEST, "RUNTIME 에러입니다.", "Z02"),

    // authentication
    INVALID_EXPIRED_JWT(HttpStatus.FORBIDDEN, "만료된 토큰입니다.", "A01"),
    INVALID_MALFORMED_JWT(HttpStatus.UNAUTHORIZED, "잘못된 토큰 서명입니다.", "A02"),
    INVALID_UNSUPPORTED_JWT(HttpStatus.UNAUTHORIZED, "지원하지 않는 토큰입니다.", "A03"),
    INVALID_ILLEGAL_ARGUMENT_JWT(HttpStatus.UNAUTHORIZED, "토큰이 잘못되었습니다.", "A04"),
    INVALID_LOGOUT_USER_JWT(HttpStatus.UNAUTHORIZED, "로그아웃된 유저입니다.", "A05"),
    INVALID_NOT_FOUND_AUTHORITY(HttpStatus.NOT_FOUND, "토큰에 권한값이 존재하지 않습니다.", "A06"),

    // refresh token
    INVALID_NOT_MATCH_BY_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "리프래시 토큰이 일치하지 않습니다.", "A07"),
    INVALID_EXPIRED_REFRESH_TOKEN(HttpStatus.FORBIDDEN, "만료된 리프래시 토큰입니다.", "A08"),
    INVALID_MALFORMED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "잘못된 리프래시 토큰 서명입니다.", "A09"),
    INVALID_UNSUPPORTED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "지원하지 않는 리프래시 토큰입니다.", "A10"),
    INVALID_ILLEGAL_ARGUMENT_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "리프래시 토큰이 잘못되었습니다.", "A11"),

    // authority
    AUTHORITY_NOT_FOUND_BY_AUTHORITY_CODE(HttpStatus.NOT_FOUND, "존재하지 않는 권한코드입니다.", "B01"),

    // member
    MEMBER_NOT_FOUND_BY_EMAIL(HttpStatus.NOT_FOUND, "존재하지 않는 유저의 이메일입니다.", "C01"),
    MEMBER_NOT_FOUND_BY_USERNAME(HttpStatus.NOT_FOUND, "존재하지 않는 유저의 이름입니다.", "C02"),
    MEMBER_LOGIN_ERROR_BY_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않는 유저입니다.", "C03"),
    MEMBER_EMAIL_DUPLICATED(HttpStatus.CONFLICT, "이미 중복된 이메일의 회원 정보가 존재합니다.", "C04"),
    MEMBER_ALREADY_REQUEST_APT_HOUSE(HttpStatus.CONFLICT, "이미 아파트 등록 신청한 회원입니다.", "C05"),
    MEMBER_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 유저의 고유 ID입니다.", "C06"),

    // register Apt House
    REGISTER_APT_HOUSE_NOT_FOUND_BY_MEMBER(HttpStatus.NOT_FOUND, "아파트 등록 요청을 하지 않은 회원입니다.", "I01"),
    REGISTER_NOT_YOUR_APT(HttpStatus.UNAUTHORIZED, "회원이 요청한 아파트의 관리자가 아닙니다.", "I02"),

    // agreement
    AGREEMENT_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 동의서 ID 입니다.", "D01"),
    AGREEMENT_NOT_YOUR_APARTMENT(HttpStatus.UNAUTHORIZED, "해당 아파트의 관리자가 아닙니다.", "D02"),
    AGREEMENT_ALREADY_AGREED(HttpStatus.CONFLICT, "이미 서명한 세대입니다.", "D03"),

    // apt (Apt)
    APT_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 아파트 ID 입니다.", "C05"),
    APT_NOT_MATCH_BY_APT_ID(HttpStatus.BAD_REQUEST, "아파트 ID가 일치하지 않습니다.", "C06"),
    APT_NOT_HIS_APT(HttpStatus.BAD_REQUEST, "본인의 아파트가 아닙니다.", "C07"),

    // message
    MESSAGE_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 메시지 ID 입니다.", "E01"),
    MESSAGE_NOT_MATCH_BY_MEMBER_ID(HttpStatus.BAD_REQUEST, "메시지 송수신자와 일치하지 않는 유저입니다.", "E02"),
    MESSAGE_NOT_MATCH_BY_MEMBER_EMAIL(HttpStatus.BAD_REQUEST, "메시지 송수신자와 일치하지 않는 이메일입니다.", "E03"),

    // board
    BOARD_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 게시판입니다.", "F01"),

    // boardFavorite
    BOARD_FAVORITE_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "이미 즐겨찾기된 게시판입니다.", "F02"),
    BOARD_FAVORITE_NOT_FOUND(HttpStatus.BAD_REQUEST, "즐겨찾기 되지 않은 게시판입니다.", "F03"),

    // article
    ARTICLE_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 게시글입니다.", "G01"),
    ARTICLE_NOT_MATCH_BY_EMAIL(HttpStatus.BAD_REQUEST, "게시글 작성자와 일치하지 않는 이메일입니다.", "G02"),

    // articleLike
    ARTICLE_LIKE_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "이미 좋아요한 게시글입니다.", "G03"),
    ARTICLE_LIKE_NOT_FOUND(HttpStatus.BAD_REQUEST, "좋아요 되지 않은 게시글입니다.", "G04"),

    // articleReport
    ARTICLE_REPORT_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "이미 신고한 게시글입니다.", "G05"),

    // comment
    COMMENT_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 댓글입니다.", "H01"),
    COMMENT_NOT_MATCH_BY_MEMBER_EMAIL(HttpStatus.BAD_REQUEST, "댓글 작성자와 일치하지 않는 이메일입니다.", "H02"),

    // commentLike
    COMMENT_LIKE_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "이미 좋아요한 댓글입니다.", "H03"),
    COMMENT_LIKE_NOT_FOUND(HttpStatus.BAD_REQUEST, "좋아요 되지 않은 댓글입니다.", "H04"),

    // comment_Report
    COMMENT_REPORT_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "이미 신고한 댓글입니다.", "H05"),

    // reply
    REPLY_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "존재하지 않는 대댓글입니다.", "H06"),
    REPLY_NOT_MATCH_BY_EMAIL(HttpStatus.BAD_REQUEST, "대댓글 작성자와 일치하지 않는 이메일입니다.", "H07"),

    // replyLike
    REPLY_LIKE_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "이미 좋아요한 대댓글입니다.", "H08"),
    REPLY_LIKE_NOT_FOUND(HttpStatus.BAD_REQUEST, "좋아요 되지 않은 대댓글입니다.", "H09"),

    // replyReport
    REPLY_REPORT_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "이미 신고한 대댓글입니다.", "H10");

    private final HttpStatus httpStatus;
    private final String message;
    private final String code;

    ErrorCode(HttpStatus httpStatus, String message, String code) {
        this.httpStatus = httpStatus;
        this.message = message;
        this.code = code;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getMessage() {
        return message;
    }

    public String getCode() {
        return code;
    }
}
