package com.sweet.home.apt.service;

import com.sweet.home.apt.controller.dto.request.RegisterAptHouseRequest;
import com.sweet.home.apt.domain.Apt;
import com.sweet.home.apt.domain.AptRepository;
import com.sweet.home.apt.domain.RegisterAptHouse;
import com.sweet.home.apt.domain.RegisterAptHouseRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AptService {

    private final AptRepository aptRepository;
    private final RegisterAptHouseRepository registerAptHouseRepository;
    private final MemberService memberService;

    public AptService(AptRepository aptRepository, RegisterAptHouseRepository registerAptHouseRepository,
        MemberService memberService) {
        this.aptRepository = aptRepository;
        this.registerAptHouseRepository = registerAptHouseRepository;
        this.memberService = memberService;
    }

    public Apt findById(Long aptId) {
        return aptRepository.findById(aptId)
            .orElseThrow(() -> new BusinessException(ErrorCode.APT_NOT_FOUND_BY_ID));
    }

    @Transactional
    public void createRegisterApt(String email, RegisterAptHouseRequest request) {
        Member member = memberService.findByEmail(email);
        Apt apt = findById(request.getAptId());
        checkDuplicateMember(member);

        registerAptHouseRepository.save(RegisterAptHouse.createRegisterAptHouse(member, apt, request));
    }

    private void checkDuplicateMember(Member member) {
        if (registerAptHouseRepository.existsByMember(member)) {
            throw new BusinessException(ErrorCode.MEMBER_ALREADY_REQUEST_APT_HOUSE);
        }
    }
}
