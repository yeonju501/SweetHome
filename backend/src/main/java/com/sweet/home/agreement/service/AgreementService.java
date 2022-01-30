package com.sweet.home.agreement.service;

import com.sweet.home.agreement.controller.dto.request.AgreementRequest;
import com.sweet.home.agreement.domain.AgreementRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AgreementService {

    private final AgreementRepository agreementRepository;

    public AgreementService(AgreementRepository agreementRepository) {
        this.agreementRepository = agreementRepository;
    }

    @Transactional
    public void createAgreement(String email, AgreementRequest request){

    }
}
