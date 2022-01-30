package com.sweet.home.agreement.controller;

import com.sweet.home.agreement.controller.dto.request.AgreementRequest;
import com.sweet.home.agreement.service.AgreementService;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AgreementRestController {

    private final AgreementService agreementService;

    public AgreementRestController(AgreementService agreementService) {
        this.agreementService = agreementService;
    }

    //생성
    @PostMapping("/agreements")
    public ResponseEntity<Void> createAgreement(@AuthenticationPrincipal String email,
        @RequestBody AgreementRequest request) {
        agreementService.createAgreement(email, request);
        URI uri = URI.create("api/agreements/");
        return ResponseEntity.created(uri).build();
    }

    //삭제
    @DeleteMapping("/agreements/{agreement_id}")
    public ResponseEntity<Void> deleteMessage(@AuthenticationPrincipal String email,
        @PathVariable(value = "agreement_id") Long agreementId) {
        agreementService.deleteAgreement(email, agreementId);
        return ResponseEntity.noContent().build();
    }

    //수정
    //상세조회
    //목록조회
}
