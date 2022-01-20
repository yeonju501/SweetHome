package com.sweet.home.auth.domain;

public enum Authority {

    ROLE_ASSOCIATE_MEMBER("준회원", "A00"),
    ROLE_REGULAR_MEMBER("정회원", "A01"),
    ROLE_MANAGER("아파트관리자", "A02"),
    ROLE_ADMIN("어드민", "A03"),
    ;

    private final String role;
    private final String authorityCode;

    Authority(String role, String authorityCode) {
        this.role = role;
        this.authorityCode = authorityCode;
    }

    public String getRole() {
        return role;
    }

    public String getAuthorityCode() {
        return authorityCode;
    }
}
