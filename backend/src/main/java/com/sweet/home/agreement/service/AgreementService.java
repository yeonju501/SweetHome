package com.sweet.home.agreement.service;

import com.sweet.home.agreement.controller.dto.request.AgreeRequest;
import com.sweet.home.agreement.controller.dto.request.AgreementRequest;
import com.sweet.home.agreement.controller.dto.response.AgreedHouseResponse;
import com.sweet.home.agreement.controller.dto.response.AgreementDetailResponse;
import com.sweet.home.agreement.controller.dto.response.AgreementResponse;
import com.sweet.home.agreement.domain.AgreedHouseRepository;
import com.sweet.home.agreement.domain.Agreement;
import com.sweet.home.agreement.domain.AgreementRepository;
import com.sweet.home.building.domain.Building;
import com.sweet.home.building.domain.BuildingHouse;
import com.sweet.home.building.domain.BuildingRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AgreementService {

    private final AgreementRepository agreementRepository;
    private final MemberService memberService;
    private final BuildingRepository buildingRepository;
    private final AgreedHouseRepository agreedHouseRepository;

    public AgreementService(AgreementRepository agreementRepository, MemberService memberService,
        BuildingRepository buildingRepository, AgreedHouseRepository agreedHouseRepository) {
        this.agreementRepository = agreementRepository;
        this.memberService = memberService;
        this.buildingRepository = buildingRepository;
        this.agreedHouseRepository = agreedHouseRepository;
    }

    @Transactional
    public void createAgreement(String email, AgreementRequest request) {
        // 이메일로 유저 아이디 찾고
        Member member = memberService.findByEmail(email);

        //TODO: 로그인한 유저가 아파트 관리자인지 판별 및 어느 아파트 관리자인지 파악
        // 찾은 유저 아이디로 어느 건물 관리자인지 찾고
        // BuildingMember buildingMember = buildingMemberService.findByMemberId(member.getId());
        // 찾은 건물 아이디를 동의서 아파트 id에 넣어야 하고
        // agreementRepository.saveAll(Agreement.createAgreement(buildingMember.getBuildingId(), request));

        //다음은 임시 코드
        Building building = buildingRepository.getById(1L);
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
        Building building = buildingRepository.getById(1L);
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
        Building building = buildingRepository.getById(1L);
        // 임시코드 끝

        agreement.checkBuildingRelationship(building);

        agreement.changeTitle(request.getTitle());
        agreement.changeContent(request.getContent());
        agreement.changeStartDate(request.getStartDate());
        agreement.changeEndDate(request.getEndDate());
    }

    @Transactional(readOnly = true)
    public AgreementDetailResponse viewAgreementDetail(String email, Long agreementId) {
        Member member = memberService.findByEmail(email);
        Agreement agreement = agreementRepository.findById(agreementId)
            .orElseThrow(() -> new BusinessException(ErrorCode.AGREEMENT_NOT_FOUND_BY_ID));

        //TODO: 멤버가 이 동의서의 아파트에서 살고있는지 확인하는 로직
        // 임시코드
        // Member에서 찾은 BuildingHouseMember에서 찾은 BuildingHouse 의 building_id 필요
        Building building = buildingRepository.getById(1L);
        // 임시코드 끝

        agreement.checkBuildingRelationship(building);

        return AgreementDetailResponse.from(agreement);
    }

    @Transactional(readOnly = true)
    public List<AgreementResponse> viewAgreements(Pageable pageable, String email) {
        Member member = memberService.findByEmail(email);

        //TODO: 멤버가 이 동의서의 아파트에서 살고있는지 확인하는 로직
        // 임시코드
        // Member에서 찾은 BuildingHouseMember에서 찾은 BuildingHouse 의 building_id 필요
        Building building = buildingRepository.getById(1L);
        // 임시코드 끝

        return agreementRepository.findByBuilding(building, pageable).stream()
            .map(AgreementResponse::from)
            .collect(Collectors.toList());
    }

    @Transactional
    public void createAgree(String email, Long agreementId, AgreeRequest request) {
        //멤버 찾기
        Member member = memberService.findByEmail(email);
        //멤버의 buildingHouseMember 찾기
        //BuildingHouseMember buildingHouseMember = buildingHouseMemberService.findByMember(member);
        //동의서 ID 찾기
        Agreement agreement = agreementRepository.findById(agreementId)
            .orElseThrow(() -> new BusinessException(ErrorCode.AGREEMENT_NOT_FOUND_BY_ID));

        //동의서의 buildingId와 멤버에서 찾은 BuildingHouse의 BuildingID 가 같은지 확인
        //checkSameBuilding(agreement.getBuilding(), buildingHouseMember.getBuildingHouse().getBuilding());
        //이미 서명한 세대인지 확인
        //checkDuplicateHouse(buildingHouseMember.getBuildingHouse());

        //agreedHouseRepository.save(AgreedHouse.createAgree(agreement, buildingHouseMember.getBuildingHouse(), request));
    }

    private void checkSameBuilding(Building firstBuilding, Building secondBuilding) {
        if (!firstBuilding.equals(secondBuilding)) {
            throw new BusinessException(ErrorCode.BUILDING_NOT_MATCH_BY_BUILDING_ID);
        }
    }

    private void checkDuplicateHouse(BuildingHouse buildingHouse) {
        if (agreedHouseRepository.existsByBuildingHouse(buildingHouse)) {
            throw new BusinessException(ErrorCode.AGREEMENT_ALREADY_AGREED);
        }
    }

    @Transactional(readOnly = true)
    public List<AgreedHouseResponse> viewAgreedHouses(String email, Long agreementId) {
        Member member = memberService.findByEmail(email);

        //TODO: 이 멤버가 해당 동의서의 아파트 관리자인지 찾기

        Agreement agreement = agreementRepository.findById(agreementId)
            .orElseThrow(() -> new BusinessException(ErrorCode.AGREEMENT_NOT_FOUND_BY_ID));

        return agreedHouseRepository.findByAgreement(agreement).stream()
            .map(AgreedHouseResponse::from)
            .collect(Collectors.toList());
    }
}

