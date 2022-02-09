package com.sweet.home.apt.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.apt.domain.RegisterAptManager;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public class RegisterAptManagersResponse {

    @JsonProperty("register_managers")
    private List<RegisterAptManagerResponse> registerAptManagerResponse;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    private int currentPageCount;

    public RegisterAptManagersResponse() {
    }

    public RegisterAptManagersResponse(
        List<RegisterAptManagerResponse> registerAptManagerResponse, int totalPageCount, int currentPageCount) {
        this.registerAptManagerResponse = registerAptManagerResponse;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static RegisterAptManagersResponse from(Page<RegisterAptManager> registerAptManagers) {
        return new RegisterAptManagersResponse(
            registerAptManagers.stream()
                .map(RegisterAptManagerResponse::from)
                .collect(Collectors.toList()),
            registerAptManagers.getTotalPages(),
            registerAptManagers.getNumber()
        );
    }
}
