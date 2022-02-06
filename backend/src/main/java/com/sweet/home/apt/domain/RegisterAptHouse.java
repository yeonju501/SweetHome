package com.sweet.home.apt.domain;

import com.sweet.home.apt.controller.dto.request.RegisterAptHouseRequest;
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

@Entity
@Getter
public class RegisterAptHouse extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "register_apt_house_id")
    private Long id;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(targetEntity = Apt.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "apt_id")
    private Apt apt;

    @Column(name = "dong", nullable = true)
    private String dong;

    @Column(name = "ho", nullable = true)
    private String ho;

    protected RegisterAptHouse() {
    }

    @Builder
    public RegisterAptHouse(Member member, Apt apt, String dong, String ho) {
        this.member = member;
        this.apt = apt;
        this.dong = dong;
        this.ho = ho;
    }

    public static RegisterAptHouse createRegisterAptHouse(Member member, Apt apt, RegisterAptHouseRequest request) {
        return RegisterAptHouse.builder()
            .member(member)
            .apt(apt)
            .dong(request.getDong())
            .ho(request.getHo())
            .build();
    }
}
