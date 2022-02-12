package com.sweet.home.apt.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.apt.domain.RegisterAptManager;
import java.time.LocalDateTime;

public class MyRegisterAptManagerResponse {

    @JsonProperty("apt_id")
    private Long aptId;

    @JsonProperty("apt_number")
    private String aptNumber;

    @JsonProperty("sido_name")
    private String sidoName;

    @JsonProperty("gungu_name")
    private String gunguName;

    @JsonProperty("dong_name")
    private String dongName;

    @JsonProperty("road_name")
    private String roadName;

    @JsonProperty("road_apt_num")
    private Integer roadAptNum;

    @JsonProperty("zip_code")
    private String zipCode;

    @JsonProperty("apt_name")
    private String aptName;

    @JsonProperty("message")
    private String message;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    public MyRegisterAptManagerResponse() {
    }

    public MyRegisterAptManagerResponse(Long aptId, String aptNumber, String sidoName, String gunguName, String dongName,
        String roadName, Integer roadAptNum, String zipCode, String aptName, String message, LocalDateTime createdAt) {
        this.aptId = aptId;
        this.aptNumber = aptNumber;
        this.sidoName = sidoName;
        this.gunguName = gunguName;
        this.dongName = dongName;
        this.roadName = roadName;
        this.roadAptNum = roadAptNum;
        this.zipCode = zipCode;
        this.aptName = aptName;
        this.message = message;
        this.createdAt = createdAt;
    }

    public static MyRegisterAptManagerResponse from(RegisterAptManager registerAptManager) {
        return new MyRegisterAptManagerResponse(
            registerAptManager.getApt() == null ? null : registerAptManager.getApt().getId(),
            registerAptManager.getAptNumber(),
            registerAptManager.getSidoName(),
            registerAptManager.getGunguName(),
            registerAptManager.getDongName(),
            registerAptManager.getRoadName(),
            registerAptManager.getRoadAptNum(),
            registerAptManager.getZipCode(),
            registerAptManager.getAptName(),
            registerAptManager.getMessage(),
            registerAptManager.getCreatedAt()
        );
    }
}
