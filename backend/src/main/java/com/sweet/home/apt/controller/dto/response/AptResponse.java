package com.sweet.home.apt.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.apt.domain.Apt;

public class AptResponse {

    @JsonProperty("apt_id")
    private Long id;

    @JsonProperty("sido_name")
    private String sidoName;

    @JsonProperty("gungu_name")
    private String gunguName;

    @JsonProperty("dong_name")
    private String dongName;

    @JsonProperty("road_Name")
    private String roadName;

    @JsonProperty("road_apt_num")
    private Integer roadAptNum;

    @JsonProperty("apt_number")
    private String aptNumber;

    @JsonProperty("zip_code")
    private String zipCode;

    @JsonProperty("apt_name")
    private String aptName;

    public AptResponse() {
    }

    public AptResponse(Long id, String sidoName, String gunguName, String dongName, String roadName, Integer roadAptNum,
        String aptNumber, String zipCode, String aptName) {
        this.id = id;
        this.sidoName = sidoName;
        this.gunguName = gunguName;
        this.dongName = dongName;
        this.roadName = roadName;
        this.roadAptNum = roadAptNum;
        this.aptNumber = aptNumber;
        this.zipCode = zipCode;
        this.aptName = aptName;
    }

    public static AptResponse from(Apt apt) {
        return new AptResponse(
            apt.getId(),
            apt.getSidoName(),
            apt.getGunguName(),
            apt.getDongName(),
            apt.getRoadName(),
            apt.getRoadAptNum(),
            apt.getAptNumber(),
            apt.getZipCode(),
            apt.getAptName()
        );
    }
}
