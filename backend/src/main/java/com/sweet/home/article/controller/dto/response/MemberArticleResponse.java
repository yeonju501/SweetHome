package com.sweet.home.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.member.domain.Member;
import lombok.Getter;

@Getter
public class MemberArticleResponse {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("email")
    private String email;

    protected MemberArticleResponse() {
    }

    public MemberArticleResponse(Long id, String email) {
        this.id = id;
        this.email = email;
    }

    public static MemberArticleResponse from(Member member) {
        return new MemberArticleResponse(
            member.getId(),
            member.getEmail()
        );
    }
}
