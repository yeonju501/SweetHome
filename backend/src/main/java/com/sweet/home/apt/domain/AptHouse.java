package com.sweet.home.apt.domain;

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
public class AptHouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "apt_house_id")
    private Long id;

    @ManyToOne(targetEntity = Apt.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "apt_id")
    private Apt apt;

    @Column(name = "dong", nullable = true)
    private String dong;

    @Column(name = "ho", nullable = true)
    private String ho;

    protected AptHouse() {
    }

    @Builder
    public AptHouse(Apt apt, String dong, String ho) {
        this.apt = apt;
        this.dong = dong;
        this.ho = ho;
    }
}
