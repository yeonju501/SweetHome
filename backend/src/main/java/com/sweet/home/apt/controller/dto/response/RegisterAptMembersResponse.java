package com.sweet.home.apt.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.apt.domain.RegisterAptHouse;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public class RegisterAptMembersResponse {

    @JsonProperty("register_members")
    private List<RegisterAptMemberResponse> registerAptMemberResponse;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    private int currentPageCount;

    public RegisterAptMembersResponse() {
    }

    public RegisterAptMembersResponse(
        List<RegisterAptMemberResponse> registerAptMemberResponse, int totalPageCount, int currentPageCount) {
        this.registerAptMemberResponse = registerAptMemberResponse;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static RegisterAptMembersResponse from(Page<RegisterAptHouse> registerAptHouses) {
        return new RegisterAptMembersResponse(
            registerAptHouses.stream()
                .map(RegisterAptMemberResponse::from)
                .collect(Collectors.toList()),
            registerAptHouses.getTotalPages(),
            registerAptHouses.getNumber()
        );
    }
}
