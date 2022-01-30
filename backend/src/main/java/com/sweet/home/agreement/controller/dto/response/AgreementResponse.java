package com.sweet.home.agreement.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.agreement.domain.Agreement;
import java.time.LocalDateTime;

public class AgreementResponse {
    @JsonProperty("title")
    private String title;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonProperty("start_date")
    private LocalDateTime startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonProperty("end_date")
    private LocalDateTime endDate;


    public AgreementResponse() {
    }

    public AgreementResponse(String title, LocalDateTime createdAt, LocalDateTime startDate,
        LocalDateTime endDate) {
        this.title = title;
        this.createdAt = createdAt;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public static AgreementResponse from(Agreement agreement){
        return new AgreementResponse(
            agreement.getTitle(),
            agreement.getCreatedAt(),
            agreement.getStartDate(),
            agreement.getEndDate()
        );
    }
}
