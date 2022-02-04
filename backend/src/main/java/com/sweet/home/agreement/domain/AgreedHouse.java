package com.sweet.home.agreement.domain;

import com.sweet.home.agreement.controller.dto.request.AgreeRequest;
import com.sweet.home.apt.domain.AptHouse;
import com.sweet.home.global.domain.BaseEntity;
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

@Getter
@Entity
public class AgreedHouse extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "agreed_house_id")
    private Long id;

    @ManyToOne(targetEntity = Agreement.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "agreement_id")
    private Agreement agreement;

    @ManyToOne(targetEntity = AptHouse.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "apt_house_id")
    private AptHouse aptHouse;

    @Column(name = "agreement_status")
    private boolean agreement_status;

    protected AgreedHouse() {
    }

    @Builder
    public AgreedHouse(Agreement agreement, AptHouse aptHouse, boolean agreement_status) {
        this.agreement = agreement;
        this.aptHouse = aptHouse;
        this.agreement_status = agreement_status;
    }

    public static AgreedHouse createAgree(Agreement agreement, AptHouse aptHouse, AgreeRequest request) {
        return AgreedHouse.builder()
            .agreement(agreement)
            .aptHouse(aptHouse)
            .agreement_status(request.getAgreementStatus())
            .build();
    }
}
