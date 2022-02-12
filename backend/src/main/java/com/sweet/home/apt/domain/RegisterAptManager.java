package com.sweet.home.apt.domain;

import com.sweet.home.apt.controller.dto.request.RegisterAptManagerRequest;
import com.sweet.home.global.domain.BaseEntity;
import com.sweet.home.member.domain.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class RegisterAptManager extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "register_apt_manager_id")
    private Long id;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(targetEntity = Apt.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "apt_id")
    private Apt apt;

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

    @Column(name = "message", length = 400, nullable = false)
    private String message;

    protected RegisterAptManager() {
    }

    @Builder
    public RegisterAptManager(Member member, Apt apt, String sidoName, String gunguName, String dongName, String roadName,
        Integer roadAptNum, String aptNumber, String zipCode, String aptName, String message) {
        this.member = member;
        this.apt = apt;
        this.sidoName = sidoName;
        this.gunguName = gunguName;
        this.dongName = dongName;
        this.roadName = roadName;
        this.roadAptNum = roadAptNum;
        this.aptNumber = aptNumber;
        this.zipCode = zipCode;
        this.aptName = aptName;
        this.message = message;
    }

    public static RegisterAptManager createRegisterAptManager(Member member, RegisterAptManagerRequest request, Apt apt) {
        return RegisterAptManager.builder()
            .member(member)
            .apt(apt)
            .sidoName(request.getSidoName())
            .gunguName(request.getGunguName())
            .dongName(request.getDongName())
            .roadName(request.getRoadName())
            .roadAptNum(request.getRoadAptNum())
            .aptNumber(request.getAptNumber())
            .zipCode(request.getZipCode())
            .aptName(request.getAptName())
            .message(request.getMessage())
            .build();
    }
}
