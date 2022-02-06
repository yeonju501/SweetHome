package com.sweet.home.apt.controller;

import com.sweet.home.apt.controller.dto.request.RegisterAptHouseRequest;
import com.sweet.home.apt.service.AptService;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AptRestController {

    private final AptService aptService;

    public AptRestController(AptService aptService) {
        this.aptService = aptService;
    }

    //일반 회원 영역
    //등록 요청 - 회원의 아파트 등록 요청 = POST
    @PostMapping("/apts/register")
    public ResponseEntity<Void> createRegisterApt(@AuthenticationPrincipal String email,
        @RequestBody RegisterAptHouseRequest request) {
        aptService.createRegisterApt(email, request);
        URI uri = URI.create("/api/register/");
        return ResponseEntity.created(uri).build();
    }

    //등록 요청 - 회원의 아파트 등록 취소 = DELETE

    //등록 요청 - 현재 요청중인 아파트 보기 = GET

    //관리자영역
    //등록 요청 - 아파트 등록 요청 회원 목록 보기 = GET

    //등록 요청 - 아파트 등록 요청 승인하기 = POST

    //등록 요청 - 아파트 등록 요청 다중 승인하기 = POST

    //등록 요청 - 아파트 등록 요청 거절하기 = ??

    //등록 요청 - 아파트 등록 요청 다중 거절하기 = ??

    //아파트 회원 관리 - 관리하는 아파트의 회원 조회하기 = GET

    //아파트 회원 관리 - 회원을 아파트 멤버에서 제외하기 = DELETE

}
