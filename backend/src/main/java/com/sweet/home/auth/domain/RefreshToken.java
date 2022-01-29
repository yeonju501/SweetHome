package com.sweet.home.auth.domain;

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

    public RefreshToken updateValue(String token) {
        this.value = token;
        return this;
    }

    @Builder
    public RefreshToken(String key, String value) {
        this.key = key;
        this.value = value;
    }
}
