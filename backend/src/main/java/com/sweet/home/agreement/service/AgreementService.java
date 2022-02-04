package com.sweet.home.agreement.service;

import com.sweet.home.agreement.controller.dto.request.AgreeRequest;
import com.sweet.home.agreement.controller.dto.request.AgreementRequest;
import com.sweet.home.agreement.controller.dto.response.AgreedHouseResponse;
import com.sweet.home.agreement.controller.dto.response.AgreementDetailResponse;
import com.sweet.home.agreement.controller.dto.response.AgreementResponse;
import com.sweet.home.agreement.domain.AgreedHouseRepository;
import com.sweet.home.agreement.domain.Agreement;
import com.sweet.home.agreement.domain.AgreementRepository;
import com.sweet.home.apt.domain.Apt;
import com.sweet.home.apt.domain.AptHouse;
import com.sweet.home.apt.domain.AptRepository;
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
    private final AptRepository aptRepository; // 이건 나중에 aptService로 빼낼 것
    private final AgreedHouseRepository agreedHouseRepository;

    public AgreementService(AgreementRepository agreementRepository, MemberService memberService,
        AptRepository aptRepository, AgreedHouseRepository agreedHouseRepository) {
        this.agreementRepository = agreementRepository;
        this.memberService = memberService;
        this.aptRepository = aptRepository; // 이건 나중에 aptService로 빼낼 것
        this.agreedHouseRepository = agreedHouseRepository;
    }

    @Transactional
    public void createAgreement(String email, AgreementRequest request) {
        // 이메일로 유저 아이디 찾고
        Member member = memberService.findByEmail(email);

        //TODO: 로그인한 유저가 아파트 관리자인지 판별 및 어느 아파트 관리자인지 파악
        // 찾은 유저 아이디로 어느 건물 관리자인지 찾고
        // AptMember aptMember = aptMemberService.findByMemberId(member.getId());
        // 찾은 건물 아이디를 동의서 아파트 id에 넣어야 하고
        // agreementRepository.saveAll(Agreement.createAgreement(aptMember.getAptId(), request));

        //다음은 임시 코드
        Apt apt = aptRepository.getById(1L);
        agreementRepository.save(Agreement.createAgreement(apt, request));
        // 임시코드 끝
    }

    @Transactional
    public void deleteAgreement(String email, Long agreementId) {
        Member member = memberService.findByEmail(email);
        Agreement agreement = agreementRepository.findById(agreementId)
            .orElseThrow(() -> new BusinessException(ErrorCode.AGREEMENT_NOT_FOUND_BY_ID));

        //TODO: 멤버가 이 동의서의 아파트를 관리하는지 확인하는 로직
        // 임시코드
        // Member에서 찾은 AptMember에서의 apt_id 필요

        Apt apt = aptRepository.getById(1L);
        // 임시코드 끝

        agreement.checkAptRelationship(apt);

        agreement.deleteAgreement();
    }

    @Transactional
    public void updateAgreement(String email, AgreementRequest request, Long agreementId) {
        Member member = memberService.findByEmail(email);
        Agreement agreement = agreementRepository.findById(agreementId)
            .orElseThrow(() -> new BusinessException(ErrorCode.AGREEMENT_NOT_FOUND_BY_ID));

        //TODO: 멤버가 이 동의서의 아파트를 관리하는지 확인하는 로직
        // 임시코드
        // member에서 찾은 aptMember에서의 apt_id 필요
        Apt apt = aptRepository.getById(1L);
        // 임시코드 끝

        agreement.checkAptRelationship(apt);

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
        // member에서 찾은 aptHouseMember에서 찾은 aptHouse 의 apt_id 필요
        Apt apt = aptRepository.getById(1L);
        // 임시코드 끝

        agreement.checkAptRelationship(apt);

        return AgreementDetailResponse.from(agreement);
    }

    @Transactional(readOnly = true)
    public List<AgreementResponse> viewAgreements(Pageable pageable, String email) {
        Member member = memberService.findByEmail(email);

        //TODO: 멤버가 이 동의서의 아파트에서 살고있는지 확인하는 로직
        // 임시코드
        // member에서 찾은 aptHouseMember에서 찾은 aptHouse 의 apt_id 필요
        Apt apt = aptRepository.getById(1L);
        // 임시코드 끝

        return agreementRepository.findByApt(apt, pageable).stream()
            .map(AgreementResponse::from)
            .collect(Collectors.toList());
    }

    @Transactional
    public void createAgree(String email, Long agreementId, AgreeRequest request) {
        //멤버 찾기
        Member member = memberService.findByEmail(email);
        //멤버의 aptHouseMember 찾기
        //AptHouseMember aptHouseMember = aptHouseMemberService.findByMember(member);
        //동의서 ID 찾기
        Agreement agreement = agreementRepository.findById(agreementId)
            .orElseThrow(() -> new BusinessException(ErrorCode.AGREEMENT_NOT_FOUND_BY_ID));

        //동의서의 aptId와 멤버에서 찾은 aptHouse의 AptID 가 같은지 확인
        //checkSameApt(agreement.getApt(), aptHouseMember.getAptHouse().getApt());
        //이미 서명한 세대인지 확인
        //checkDuplicateHouse(aptHouseMember.getAptHouse());

        //agreedHouseRepository.save(AgreedHouse.createAgree(agreement, aptHouseMember.getAptHouse(), request));
    }

    private void checkSameApt(Apt firstApt, Apt secondApt) {
        if (!firstApt.equals(secondApt)) {
            throw new BusinessException(ErrorCode.APT_NOT_MATCH_BY_APT_ID);
        }
    }

    private void checkDuplicateHouse(AptHouse aptHouse) {
        if (agreedHouseRepository.existsByAptHouse(aptHouse)) {
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

