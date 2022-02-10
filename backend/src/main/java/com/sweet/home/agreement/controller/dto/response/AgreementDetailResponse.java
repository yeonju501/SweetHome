package com.sweet.home.agreement.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.agreement.domain.AgreedHouse;
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

    @JsonProperty("my_agreed")
    private Boolean myAgreed;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonProperty("my_agreed_date")
    private LocalDateTime myAgreedDate;

    @JsonProperty("total_agreed")
    private Long totalAgreed;

    @JsonProperty("total_disagreed")
    private Long totalDisagreed;

    @JsonProperty("total_apt_house")
    private Long totalAptHouse;

    public AgreementDetailResponse() {
    }

    public AgreementDetailResponse(String title, String content, LocalDateTime createdAt, LocalDateTime startDate,
        LocalDateTime endDate, Boolean myAgreed, LocalDateTime myAgreedDate, Long totalAgreed, Long totalDisagreed,
        Long totalAptHouse) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.startDate = startDate;
        this.endDate = endDate;
        this.myAgreed = myAgreed;
        this.myAgreedDate = myAgreedDate;
        this.totalAgreed = totalAgreed;
        this.totalDisagreed = totalDisagreed;
        this.totalAptHouse = totalAptHouse;
    }

    public static AgreementDetailResponse from(Agreement agreement, AgreedHouse agreedHouse){
        return new AgreementDetailResponse(
            agreement.getTitle(),
            agreement.getContent(),
            agreement.getCreatedAt(),
            agreement.getStartDate(),
            agreement.getEndDate(),
            agreedHouse.getAgreement_status(),
            agreedHouse.getCreatedAt(),
            agreement.getTotalAgreed(),
            agreement.getTotalDisagreed(),
            agreement.getTotalAptHouse()
        );
    }
}
