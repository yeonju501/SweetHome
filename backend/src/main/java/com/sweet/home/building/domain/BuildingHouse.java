package com.sweet.home.building.domain;

import com.sweet.home.message.domain.MessageContent;
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
public class BuildingHouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "building_house_id")
    private Long id;

    @ManyToOne(targetEntity = Apt.class, fetch = FetchType.LAZY)
    @Column(name = "building_id")
    private Apt apt;

    @Column(name = "dong", nullable = true)
    private String dong;

    @Column(name = "ho", nullable = true)
    private String ho;
}
