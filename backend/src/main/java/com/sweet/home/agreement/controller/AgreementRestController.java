package com.sweet.home.agreement.controller;

import com.sweet.home.agreement.controller.dto.request.AgreementRequest;
import com.sweet.home.agreement.controller.dto.response.AgreementDetailResponse;
import com.sweet.home.agreement.controller.dto.response.AgreementResponse;
import com.sweet.home.agreement.service.AgreementService;
import java.net.URI;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public ResponseEntity<Void> createAgreement(@AuthenticationPrincipal String email, @RequestBody AgreementRequest request) {
        agreementService.createAgreement(email, request);
        URI uri = URI.create("api/agreements/");
        return ResponseEntity.created(uri).build();
    }

    //삭제
    @DeleteMapping("/agreements/{agreement_id}")
    public ResponseEntity<Void> deleteAgreement(@AuthenticationPrincipal String email,
        @PathVariable(value = "agreement_id") Long agreementId) {
        agreementService.deleteAgreement(email, agreementId);
        return ResponseEntity.noContent().build();
    }

    //수정
    @PutMapping("/agreements/{agreement_id}")
    public ResponseEntity<Void> updateAgreement(@AuthenticationPrincipal String email, @RequestBody AgreementRequest request,
        @PathVariable(value = "agreement_id") Long agreementId) {
        agreementService.updateAgreement(email, request, agreementId);
        return ResponseEntity.noContent().build();
    }

    //상세조회
    @GetMapping("/agreements/{agreement_id}")
    public ResponseEntity<AgreementDetailResponse> getDetailAgreement(@AuthenticationPrincipal String email,
        @PathVariable(value = "agreement_id") Long agreementId) {
        return ResponseEntity.ok().body(agreementService.viewAgreementDetail(email, agreementId));
    }

    //목록조회
    @GetMapping("/agreements/")
    public ResponseEntity<List<AgreementResponse>> getAgreements(@AuthenticationPrincipal String email,
        @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(agreementService.viewAgreements(pageable, email));
    }
}
