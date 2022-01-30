package com.sweet.home.agreement.service;

import com.sweet.home.agreement.controller.dto.request.AgreementRequest;
import com.sweet.home.agreement.controller.dto.response.AgreementDetailResponse;
import com.sweet.home.agreement.domain.Agreement;
import com.sweet.home.agreement.domain.AgreementRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
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
    public void createAgreement(String email, AgreementRequest request) {
        // 이메일로 유저 아이디 찾고
        Member member = memberService.findByEmail(email);
        // 찾은 유저 아이디로 어느 건물 관리자인지 찾고
        // BuildingMember buildingMember = buildingMemberService.findByMemberId(member.getId());
        // 찾은 건물 아이디를 동의서 아파트 id에 넣어야 하고
        // agreementRepository.saveAll(Agreement.createAgreement(buildingMember.getBuildingId(), request));

        //다음은 임시 코드
        String building = "2030";
        agreementRepository.save(Agreement.createAgreement(building, request));
        // 임시코드 끝
    }

    @Transactional
    public void deleteAgreement(String email, Long agreementId) {
        Member member = memberService.findByEmail(email);
        Agreement agreement = agreementRepository.findById(agreementId)
            .orElseThrow(() -> new BusinessException(ErrorCode.AGREEMENT_NOT_FOUND_BY_ID));

        //TODO: 멤버가 이 동의서의 아파트를 관리하는지 확인하는 로직
        // 임시코드
        // Member에서 찾은 BuildingMember에서의 building_id 필요
        String building = "2030";
        // 임시코드 끝

        agreement.checkBuildingRelationship(building);

        agreement.deleteAgreement();
    }

    @Transactional
    public void updateAgreement(String email, AgreementRequest request, Long agreementId) {
        Member member = memberService.findByEmail(email);
        Agreement agreement = agreementRepository.findById(agreementId)
            .orElseThrow(() -> new BusinessException(ErrorCode.AGREEMENT_NOT_FOUND_BY_ID));

        //TODO: 멤버가 이 동의서의 아파트를 관리하는지 확인하는 로직
        // 임시코드
        // Member에서 찾은 BuildingMember에서의 building_id 필요
        String building = "2030";
        // 임시코드 끝

        agreement.checkBuildingRelationship(building);

        agreement.changeTitle(request.getTitle());
        agreement.changeContent(request.getContent());
        agreement.changeStartDate(request.getStartDate());
        agreement.changeEndDate(request.getEndDate());
    }

    // 메시지 상세 조회
    @Transactional(readOnly = true)
    public AgreementDetailResponse viewAgreementDetail(String email, Long agreementId) {
        Member member = memberService.findByEmail(email);
        Agreement agreement = agreementRepository.findById(agreementId)
            .orElseThrow(() -> new BusinessException(ErrorCode.AGREEMENT_NOT_FOUND_BY_ID));

        //TODO: 멤버가 이 동의서의 아파트에서 살고있는지 확인하는 로직
        // 임시코드
        // Member에서 찾은 BuildingHouseMember에서 찾은 BuildingHouse 의 building_id 필요
        String building = "2030";
        // 임시코드 끝

        agreement.checkBuildingRelationship(building);

        return AgreementDetailResponse.from(agreement);
    }
}
