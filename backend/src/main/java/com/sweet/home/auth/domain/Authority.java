package com.sweet.home.auth.domain;

import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import java.util.Arrays;

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

    public static Authority convertCodeToAuthority(String inputAuthorityCode) {
        return Arrays.stream(values())
            .filter(authority -> authority.authorityCode.equals(inputAuthorityCode))
            .findFirst()
            .orElseThrow(() -> new BusinessException(ErrorCode.AUTHORITY_NOT_FOUND_BY_AUTHORITY_CODE));
    }
}
