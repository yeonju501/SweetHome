package com.sweet.home.apt.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.member.domain.Member;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public class AptMembersResponse {

    @JsonProperty("apt_members")
    private List<AptMemberResponse> aptMemberResponse;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    private int currentPageCount;

    public AptMembersResponse() {
    }

    public AptMembersResponse(List<AptMemberResponse> aptMemberResponse, int totalPageCount, int currentPageCount) {
        this.aptMemberResponse = aptMemberResponse;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static AptMembersResponse from(Page<Member> aptMembers){
        return new AptMembersResponse(
            aptMembers.stream()
                .map(AptMemberResponse::from)
                .collect(Collectors.toList()),
            aptMembers.getTotalPages(),
            aptMembers.getNumber()
        );
    }
}
