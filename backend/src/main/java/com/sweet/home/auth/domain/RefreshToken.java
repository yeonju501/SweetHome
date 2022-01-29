package com.sweet.home.auth.domain;

import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;

@Getter
@Entity
public class RefreshToken {

    @Id
    @Column(name = "key")
    private String key;

    @Column(name = "value")
    private String value;

    protected RefreshToken() {
    }

    @Builder
    public RefreshToken(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public RefreshToken updateValue(String token) {
        this.value = token;
        return this;
    }

    public void validateValue(String refreshToken) {
        if (!value.equals(refreshToken)) {
            throw new BusinessException(ErrorCode.INVALID_NOT_MATCH_BY_REFRESH_TOKEN);
        }
    }
}
