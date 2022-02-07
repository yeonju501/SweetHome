package com.sweet.home.apt.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.apt.domain.RegisterAptHouse;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public class AptRegisterMembersResponse {
    @JsonProperty("register_members")
    private List<AptRegisterMemberResponse> aptRegisterMemberResponse;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    private int currentPageCount;

    public AptRegisterMembersResponse() {
    }

    public AptRegisterMembersResponse(
        List<AptRegisterMemberResponse> aptRegisterMemberResponse, int totalPageCount, int currentPageCount) {
        this.aptRegisterMemberResponse = aptRegisterMemberResponse;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static AptRegisterMembersResponse from(Page<RegisterAptHouse> registerAptHouses){
        return new AptRegisterMembersResponse(
            registerAptHouses.stream()
                .map(AptRegisterMemberResponse::from)
                .collect(Collectors.toList()),
            registerAptHouses.getTotalPages(),
            registerAptHouses.getNumber()
        );
    }
}
