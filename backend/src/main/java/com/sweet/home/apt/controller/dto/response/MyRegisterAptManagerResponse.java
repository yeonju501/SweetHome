package com.sweet.home.apt.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.apt.domain.RegisterAptManager;
import java.time.LocalDateTime;

public class MyRegisterAptManagerResponse {

    @JsonProperty("apt_id")
    private Long apiId;

    @JsonProperty("apt_name")
    private String aptName;

    @JsonProperty("message")
    private String message;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    public MyRegisterAptManagerResponse() {
    }

    public MyRegisterAptManagerResponse(Long apiId, String aptName, String message, LocalDateTime createdAt) {
        this.apiId = apiId;
        this.aptName = aptName;
        this.message = message;
        this.createdAt = createdAt;
    }

    public static MyRegisterAptManagerResponse from(RegisterAptManager registerAptManager) {
        return new MyRegisterAptManagerResponse(
            registerAptManager.getApt().getId(),
            registerAptManager.getApt().getName(),
            registerAptManager.getMessage(),
            registerAptManager.getCreatedAt()
        );
    }
}
