package com.sweet.home.apt.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.apt.domain.AptHouse;

public class AptHouseResponse {

    @JsonProperty("apt_house_id")
    private Long aptHouseId;

    @JsonProperty("apt")
    private AptResponse aptResponse;

    @JsonProperty("dong")
    private String dong;

    @JsonProperty("ho")
    private String ho;

    public AptHouseResponse() {
    }

    public AptHouseResponse(Long aptHouseId, AptResponse aptResponse, String dong, String ho) {
        this.aptHouseId = aptHouseId;
        this.aptResponse = aptResponse;
        this.dong = dong;
        this.ho = ho;
    }

    public static AptHouseResponse from (AptHouse aptHouse){
        return new AptHouseResponse(
            aptHouse.getId(),
            AptResponse.from(aptHouse.getApt()),
            aptHouse.getDong(),
            aptHouse.getHo()
        );
    }
}
