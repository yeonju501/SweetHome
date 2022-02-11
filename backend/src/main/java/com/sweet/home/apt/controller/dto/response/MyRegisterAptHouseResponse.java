package com.sweet.home.apt.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.apt.domain.RegisterAptHouse;
import java.time.LocalDateTime;

public class MyRegisterAptHouseResponse {

    @JsonProperty("apt_id")
    private Long apiId;

    @JsonProperty("road_name")
    private String roadName;

    @JsonProperty("apt_name")
    private String aptName;

    @JsonProperty("dong")
    private String dong;

    @JsonProperty("ho")
    private String ho;

    @JsonProperty("message")
    private String message;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    public MyRegisterAptHouseResponse() {
    }

    public MyRegisterAptHouseResponse(Long apiId, String roadName, String aptName, String dong, String ho, String message,
        LocalDateTime createdAt) {
        this.apiId = apiId;
        this.roadName = roadName;
        this.aptName = aptName;
        this.dong = dong;
        this.ho = ho;
        this.message = message;
        this.createdAt = createdAt;
    }

    public static MyRegisterAptHouseResponse from(RegisterAptHouse registerAptHouse){
        return new MyRegisterAptHouseResponse(
            registerAptHouse.getApt().getId(),
            registerAptHouse.getApt().getRoadName(),
            registerAptHouse.getApt().getAptName(),
            registerAptHouse.getDong(),
            registerAptHouse.getHo(),
            registerAptHouse.getMessage(),
            registerAptHouse.getCreatedAt()
        );
    }
}
