package com.sweet.home.auth.controller.dto;

import com.sweet.home.auth.domain.Authority;
import com.sweet.home.member.domain.Member;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;

@Getter
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String kakaoId;
    private String name;
    private String email;
    private String picture;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String kakaoId, String name, String email,
        String picture) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.kakaoId = kakaoId;
        this.name = name;
        this.email = email;
        this.picture = picture;
    }

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        return ofKakao("id", attributes);
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

        return OAuthAttributes.builder()
            .kakaoId(attributes.get("id").toString())
            .name((String) kakaoProfile.get("nickname"))
            .email((String) kakaoAccount.get("email"))
            .picture((String) kakaoProfile.get("profile_image_url"))
            .attributes(attributes)
            .nameAttributeKey(userNameAttributeName)
            .build();
    }

    public Member toEntity() {
        return Member.builder()
            .email(email)
            .username(name)
            .password(email + name)
            .authority(Authority.ROLE_ASSOCIATE_MEMBER)
            .kakaoId(kakaoId)
            .build();
    }
}
