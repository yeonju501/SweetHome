package com.sweet.home.building.domain;

import com.sweet.home.member.domain.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Getter;

@Getter
@Entity
public class BuildingHouseMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "building_house_member_id")
    private Long id;

    @ManyToOne(targetEntity = BuildingHouse.class, fetch = FetchType.LAZY)
    @Column(name = "building_house_id")
    private BuildingHouse buildingHouse;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @Column(name = "member_info_id")
    private Member member;
}
