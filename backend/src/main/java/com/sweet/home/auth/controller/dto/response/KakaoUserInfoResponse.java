package com.sweet.home.auth.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.auth.domain.Authority;
import com.sweet.home.member.domain.Member;
import java.util.Map;
import lombok.Getter;

@Getter
public class KakaoUserInfoResponse {

    @JsonProperty("id")
    private String id;

    @JsonProperty("properties")
    private Map<String, Object> properties;

    @JsonProperty("kakao_account")
    private Map<String, Object> kakaoAccount;

    public Member toEntity() {
        String email = (String) kakaoAccount.get("email");
        String username = (String) properties.get("nickname");

        return Member.builder()
            .kakaoId(id)
            .email(email)
            .username(username)
            .password(username + id)
            .authority(Authority.ROLE_ASSOCIATE_MEMBER)
            .build();
    }
}
