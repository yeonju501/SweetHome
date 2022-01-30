package com.sweet.home.agreement.controller;

import com.sweet.home.agreement.service.AgreementService;
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
    //삭제
    //수정
    //상세조회
    //목록조회
}
