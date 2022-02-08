package com.sweet.home.apt.controller;

import com.sweet.home.apt.controller.dto.request.AptHouseMemberRequest;
import com.sweet.home.apt.controller.dto.response.AptMembersResponse;
import com.sweet.home.apt.controller.dto.response.AptRegisterMembersResponse;
import com.sweet.home.apt.service.AptService;
import java.net.URI;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AptAdminRestController {

    private final AptService aptService;

    public AptAdminRestController(AptService aptService) {
        this.aptService = aptService;
    }

    //등록 요청 - 아파트 등록 요청 회원 목록 보기 = GET
    @GetMapping("/apts/register/")
    public ResponseEntity<AptRegisterMembersResponse> viewAptRegisterMembers(@AuthenticationPrincipal String email,
        Pageable pageable) {
        return ResponseEntity.ok().body(aptService.viewAptRegisterMembers(pageable, email));
    }

    //등록 요청 - 아파트 등록 요청 승인하기 = POST
    @PostMapping("/apts/register")
    public ResponseEntity<Void> allowAptHouseMember(@AuthenticationPrincipal String email,
        @RequestBody AptHouseMemberRequest request) {
        aptService.allowAptHouseMember(email, request);
        URI uri = URI.create("/api/register/");
        return ResponseEntity.created(uri).build();
    }

    //등록 요청 - 아파트 등록 요청 다중 승인하기 = POST / 나중에 할 것

    //등록 요청 - 아파트 등록 요청 거절하기 = DELDETE
    @DeleteMapping("/apts/register")
    public ResponseEntity<Void> rejectAptHouseMember(@AuthenticationPrincipal String email,
        @RequestBody AptHouseMemberRequest request) {
        aptService.rejectAptHouseMember(email, request);
        return ResponseEntity.noContent().build();
    }

    //등록 요청 - 아파트 등록 요청 다중 거절하기 = ?? / 나중에 할것

    //아파트 회원 관리 - 관리하는 아파트의 회원 조회하기 = GET
    @GetMapping("/apts/members")
    public ResponseEntity<AptMembersResponse> viewAptMembers(@AuthenticationPrincipal String email, Pageable pageable) {
        return ResponseEntity.ok().body(aptService.viewAptMembers(email, pageable));
    }

    //아파트 회원 관리 - 회원을 아파트 멤버에서 제외하기 = DELETE
}
