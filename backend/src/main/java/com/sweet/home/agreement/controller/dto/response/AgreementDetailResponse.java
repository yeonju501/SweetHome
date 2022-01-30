package com.sweet.home.agreement.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.agreement.domain.Agreement;
import java.time.LocalDateTime;

public class AgreementDetailResponse {

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonProperty("start_date")
    private LocalDateTime startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonProperty("end_date")
    private LocalDateTime endDate;

    public AgreementDetailResponse() {
    }

    public AgreementDetailResponse(String title, String content, LocalDateTime createdAt, LocalDateTime startDate,
        LocalDateTime endDate) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public static AgreementDetailResponse from(Agreement agreement){
        return new AgreementDetailResponse(
            agreement.getTitle(),
            agreement.getContent(),
            agreement.getCreatedAt(),
            agreement.getStartDate(),
            agreement.getEndDate()
        );
    }
}
