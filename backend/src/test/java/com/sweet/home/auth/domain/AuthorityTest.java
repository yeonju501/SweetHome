package com.sweet.home.auth.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AuthorityTest {

    @Test
    @DisplayName("권한 코드를 가지고 권한을 반환할 수 있다.")
    void convertCodeToAuthoritySuccessTest() {
        // given
        Authority expected = Authority.ROLE_REGULAR_MEMBER;

        // when
        Authority result = Authority.convertCodeToAuthority(expected.getAuthorityCode());

        // then
        assertThat(result).isEqualTo(expected);
    }

    @Test
    @DisplayName("없는 권한 코드로 권한을 찾으려고하면 exception이 발생해야 한다.")
    void convertCodeToAuthorityExceptionByNotFoundAuthorityTest() {
        // given
        String input = "B00";

        // when & then
        assertThatExceptionOfType(BusinessException.class)
            .isThrownBy(() -> Authority.convertCodeToAuthority(input))
            .withMessageMatching(ErrorCode.AUTHORITY_NOT_FOUND_BY_AUTHORITY_CODE.getMessage());
    }
}