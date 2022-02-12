package com.sweet.home.apt.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class Apt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "apt_id")
    private Long id;

    @Column(name = "sido_name")
    private String sidoName;

    @Column(name = "gungu_name")
    private String gunguName;

    @Column(name = "dong_name")
    private String dongName;

    @Column(name = "road_Name")
    private String roadName;

    @Column(name = "road_apt_num")
    private Integer roadAptNum;

    @Column(name = "apt_number")
    private String aptNumber;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "apt_name")
    private String aptName;

    public Apt() {
    }

    @Builder
    public Apt(String sidoName, String gunguName, String dongName, String roadName, Integer roadAptNum, String aptNumber,
        String zipCode, String aptName) {
        this.sidoName = sidoName;
        this.gunguName = gunguName;
        this.dongName = dongName;
        this.roadName = roadName;
        this.roadAptNum = roadAptNum;
        this.aptNumber = aptNumber;
        this.zipCode = zipCode;
        this.aptName = aptName;
    }

    public static Apt createApt(RegisterAptManager registerAptManager){
        return Apt.builder()
            .sidoName(registerAptManager.getSidoName())
            .gunguName(registerAptManager.getGunguName())
            .dongName(registerAptManager.getDongName())
            .roadName(registerAptManager.getRoadName())
            .roadAptNum(registerAptManager.getRoadAptNum())
            .aptNumber(registerAptManager.getAptNumber())
            .zipCode(registerAptManager.getZipCode())
            .aptName(registerAptManager.getAptName())
            .build();
    }
}
