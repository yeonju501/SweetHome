package com.sweet.home.agreement.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.agreement.domain.Agreement;
import java.time.LocalDateTime;

public class AgreementResponse {

    @JsonProperty("agreement_id")
    private Long id;

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

    @JsonProperty("total_agreed")
    private Long totalAgreed;

    @JsonProperty("total_disagreed")
    private Long totalDisagreed;

    @JsonProperty("total_apt_house")
    private Long totalAptHouse;


    public AgreementResponse() {
    }

    public AgreementResponse(Long id, String title, LocalDateTime createdAt, LocalDateTime startDate, LocalDateTime endDate,
        Long totalAgreed, Long totalDisagreed, Long totalAptHouse) {
        this.id = id;
        this.title = title;
        this.createdAt = createdAt;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalAgreed = totalAgreed;
        this.totalDisagreed = totalDisagreed;
        this.totalAptHouse = totalAptHouse;
    }

    public static AgreementResponse from(Agreement agreement) {
        return new AgreementResponse(
            agreement.getId(),
            agreement.getTitle(),
            agreement.getCreatedAt(),
            agreement.getStartDate(),
            agreement.getEndDate(),
            agreement.getTotalAgreed(),
            agreement.getTotalDisagreed(),
            agreement.getTotalAptHouse()
        );
    }
}
