package com.sweet.home.apt.service;

import com.sweet.home.apt.controller.dto.request.RegisterAptHouseRequest;
import com.sweet.home.apt.controller.dto.response.MyRegisterAptHouseResponse;
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
        checkDuplicateRegisterMember(member);

        // TODO: 이미 본인이 살고 있는 아파트면 에러 출력

        registerAptHouseRepository.save(RegisterAptHouse.createRegisterAptHouse(member, apt, request));
    }

    private void checkDuplicateRegisterMember(Member member) {
        if (registerAptHouseRepository.existsByMember(member)) {
            throw new BusinessException(ErrorCode.MEMBER_ALREADY_REQUEST_APT_HOUSE);
        }
    }

    @Transactional
    public void deleteRegisterApt(String email){
        Member member = memberService.findByEmail(email);
        RegisterAptHouse registerAptHouse = registerAptHouseRepository.findByMember(member)
            .orElseThrow(() -> new BusinessException(ErrorCode.REGISTER_APT_HOUSE_NOT_FOUND_BY_MEMBER));

        registerAptHouse.saveDeletedTime();
    }

    @Transactional
    public MyRegisterAptHouseResponse viewMyRegisterApt(String email) {
        Member member = memberService.findByEmail(email);
        RegisterAptHouse registerAptHouse = registerAptHouseRepository.findByMember(member)
            .orElseThrow(() -> new BusinessException(ErrorCode.REGISTER_APT_HOUSE_NOT_FOUND_BY_MEMBER));

        return MyRegisterAptHouseResponse.from(registerAptHouse);
    }
}
