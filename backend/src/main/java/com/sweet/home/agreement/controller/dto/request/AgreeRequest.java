package com.sweet.home.agreement.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class AgreeRequest {

    @JsonProperty("agreement_status")
    private Boolean agreementStatus;

    public AgreeRequest() {
    }

    public AgreeRequest(Boolean agreementStatus) {
        this.agreementStatus = agreementStatus;
    }
}
