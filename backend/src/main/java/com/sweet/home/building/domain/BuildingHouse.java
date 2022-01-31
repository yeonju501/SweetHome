package com.sweet.home.building.domain;

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

@Entity
@Getter
public class BuildingHouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "building_house_id")
    private Long id;

    @ManyToOne(targetEntity = Building.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id")
    private Building building;

    @Column(name = "dong", nullable = true)
    private String dong;

    @Column(name = "ho", nullable = true)
    private String ho;

    protected BuildingHouse() {
    }

    @Builder
    public BuildingHouse(Building building, String dong, String ho) {
        this.building = building;
        this.dong = dong;
        this.ho = ho;
    }
}
