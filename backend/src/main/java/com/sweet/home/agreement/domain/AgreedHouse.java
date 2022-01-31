package com.sweet.home.agreement.domain;

import com.sweet.home.agreement.controller.dto.request.AgreeRequest;
import com.sweet.home.building.domain.BuildingHouse;
import java.time.LocalDateTime;
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
import org.springframework.data.annotation.CreatedDate;

@Getter
@Entity
public class AgreedHouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "agreed_house_id")
    private Long id;

    @ManyToOne(targetEntity = Agreement.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "agreement_id")
    private Agreement agreement;

    @ManyToOne(targetEntity = BuildingHouse.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "building_house_id")
    private BuildingHouse buildingHouse;

    @Column(name = "agreement_status")
    private boolean agreement_status;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    protected AgreedHouse() {
    }

    @Builder
    public AgreedHouse(Agreement agreement, BuildingHouse buildingHouse, boolean agreement_status) {
        this.agreement = agreement;
        this.buildingHouse = buildingHouse;
        this.agreement_status = agreement_status;
    }

    public static AgreedHouse createAgree(Agreement agreement, BuildingHouse buildingHouse, AgreeRequest request) {
        return AgreedHouse.builder()
            .agreement(agreement)
            .buildingHouse(buildingHouse)
            .agreement_status(request.getAgreementStatus())
            .build();
    }
}
