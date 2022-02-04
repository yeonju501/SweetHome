package com.sweet.home.agreement.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
public class AgreementRequest {

    @JsonProperty("apt_id")
    private Long aptId;

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonProperty("start_date")
    private LocalDateTime startDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonProperty("end_date")
    private LocalDateTime endDate;

    public AgreementRequest() {
    }

    public AgreementRequest(Long aptId, String title, String content, LocalDateTime startDate, LocalDateTime endDate) {
        this.aptId = aptId;
        this.title = title;
        this.content = content;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
