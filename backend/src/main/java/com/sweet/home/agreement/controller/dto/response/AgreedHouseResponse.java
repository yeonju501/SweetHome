package com.sweet.home.agreement.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.agreement.domain.AgreedHouse;
import java.time.LocalDateTime;

public class AgreedHouseResponse {

    @JsonProperty("dong")
    private String dong;

    @JsonProperty("ho")
    private String ho;

    @JsonProperty("agreement_status")
    private Boolean agreementStatus;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    public AgreedHouseResponse() {
    }

    public AgreedHouseResponse(String dong, String ho, Boolean agreementStatus, LocalDateTime createdAt) {
        this.dong = dong;
        this.ho = ho;
        this.agreementStatus = agreementStatus;
        this.createdAt = createdAt;
    }

    public static AgreedHouseResponse from(AgreedHouse agreedHouse) {
        return new AgreedHouseResponse(
            agreedHouse.getAptHouse().getDong(),
            agreedHouse.getAptHouse().getHo(),
            agreedHouse.isAgreement_status(),
            agreedHouse.getCreatedAt()
        );
    }
}
