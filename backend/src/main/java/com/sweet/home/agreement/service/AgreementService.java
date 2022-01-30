package com.sweet.home.agreement.service;

import com.sweet.home.agreement.controller.dto.request.AgreementRequest;
import com.sweet.home.agreement.domain.Agreement;
import com.sweet.home.agreement.domain.AgreementRepository;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AgreementService {

    private final AgreementRepository agreementRepository;
    private final MemberService memberService;

    public AgreementService(AgreementRepository agreementRepository, MemberService memberService) {
        this.agreementRepository = agreementRepository;
        this.memberService = memberService;
    }

    @Transactional
    public void createAgreement(String email, AgreementRequest request){
        // 이메일로 유저 아이디 찾고
        Member member = memberService.findByEmail(email);
        // 찾은 유저 아이디로 어느 건물 관리자인지 찾고
        // BuildingMember buildingMember = buildingMemberService.findByMemberId(member.getId());
        // 찾은 건물 아이디를 동의서 아파트 id에 넣어야 하고
        // agreementRepository.saveAll(Agreement.createAgreement(buildingMember.getBuildingId(), request));

        //다음은 임시 코드
        String building = "2030";
        agreementRepository.save(Agreement.createAgreement(building, request));
    }
}
