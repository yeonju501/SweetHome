package com.sweet.home.agreement.service;

import com.sweet.home.agreement.controller.dto.request.AgreeRequest;
import com.sweet.home.agreement.controller.dto.request.AgreementRequest;
import com.sweet.home.agreement.controller.dto.response.AgreedHouseResponse;
import com.sweet.home.agreement.controller.dto.response.AgreementDetailResponse;
import com.sweet.home.agreement.controller.dto.response.AgreementsResponse;
import com.sweet.home.agreement.domain.AgreedHouse;
import com.sweet.home.agreement.domain.AgreedHouseRepository;
import com.sweet.home.agreement.domain.Agreement;
import com.sweet.home.agreement.domain.AgreementRepository;
import com.sweet.home.apt.domain.AptHouse;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AgreementService {

    private final AgreementRepository agreementRepository;
    private final AgreedHouseRepository agreedHouseRepository;
    private final MemberService memberService;

    public AgreementService(AgreementRepository agreementRepository, AgreedHouseRepository agreedHouseRepository,
        MemberService memberService) {
        this.agreementRepository = agreementRepository;
        this.agreedHouseRepository = agreedHouseRepository;
        this.memberService = memberService;
    }

    @Transactional
    public void createAgreement(String email, AgreementRequest request) {
        Member member = memberService.findByEmail(email);

        agreementRepository.save(Agreement.createAgreement(member.getAptHouse().getApt(), request));
    }

    @Transactional
    public void deleteAgreement(String email, Long agreementId) {
        Member member = memberService.findByEmail(email);
        Agreement agreement = agreementRepository.findById(agreementId)
            .orElseThrow(() -> new BusinessException(ErrorCode.AGREEMENT_NOT_FOUND_BY_ID));

        agreement.checkAptRelationship(member.getAptHouse().getApt());

        agreement.saveDeletedTime();
    }

    @Transactional
    public void updateAgreement(String email, AgreementRequest request, Long agreementId) {
        Member member = memberService.findByEmail(email);
        Agreement agreement = agreementRepository.findById(agreementId)
            .orElseThrow(() -> new BusinessException(ErrorCode.AGREEMENT_NOT_FOUND_BY_ID));

        agreement.checkAptRelationship(member.getAptHouse().getApt());

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

        agreement.checkAptRelationship(member.getAptHouse().getApt());

        return AgreementDetailResponse.from(agreement);
    }

    @Transactional(readOnly = true)
    public AgreementsResponse viewAgreements(Pageable pageable, String email) {
        Member member = memberService.findByEmail(email);

        Page<Agreement> agreements = agreementRepository.findByApt(member.getAptHouse().getApt(), pageable);

        return AgreementsResponse.from(agreements);
    }

    @Transactional
    public void createAgree(String email, Long agreementId, AgreeRequest request) {
        Member member = memberService.findByEmail(email);
        Agreement agreement = agreementRepository.findById(agreementId)
            .orElseThrow(() -> new BusinessException(ErrorCode.AGREEMENT_NOT_FOUND_BY_ID));

        member.checkAptMember(agreement.getApt());
        checkDuplicateHouse(agreement, member.getAptHouse());

        agreedHouseRepository.save(AgreedHouse.createAgree(agreement, member.getAptHouse(), request));
    }

    private void checkDuplicateHouse(Agreement agreement, AptHouse aptHouse) {
        if (agreedHouseRepository.existsByAgreementAndAptHouse(agreement, aptHouse)) {
            throw new BusinessException(ErrorCode.AGREEMENT_ALREADY_AGREED);
        }
    }

    @Transactional(readOnly = true)
    public List<AgreedHouseResponse> viewAgreedHouses(String email, Long agreementId) {
        Member member = memberService.findByEmail(email);
        Agreement agreement = agreementRepository.findById(agreementId)
            .orElseThrow(() -> new BusinessException(ErrorCode.AGREEMENT_NOT_FOUND_BY_ID));

        agreement.checkAptRelationship(member.getAptHouse().getApt());

        return agreedHouseRepository.findByAgreement(agreement).stream()
            .map(AgreedHouseResponse::from)
            .collect(Collectors.toList());
    }
}

