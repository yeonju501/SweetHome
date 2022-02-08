package com.sweet.home.agreement.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.agreement.domain.Agreement;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public class AgreementsResponse {

    @JsonProperty("agreements")
    private List<AgreementResponse> agreementResponse;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    private int currentPageCount;

    public AgreementsResponse() {
    }

    public AgreementsResponse(List<AgreementResponse> agreementResponse, int totalPageCount, int currentPageCount) {
        this.agreementResponse = agreementResponse;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static AgreementsResponse from(Page<Agreement> agreements){
        return new AgreementsResponse(
            agreements.stream()
                .map(AgreementResponse::from)
                .collect(Collectors.toList()),
            agreements.getTotalPages(),
            agreements.getNumber()
        );
    }
}
