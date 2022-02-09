package com.sweet.home.apt.controller;

import com.sweet.home.apt.controller.dto.response.RegisterAptManagersResponse;
import com.sweet.home.apt.service.AptService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/superadmin")
public class AptSuperAdminRestController {

    private final AptService aptService;

    public AptSuperAdminRestController(AptService aptService) {
        this.aptService = aptService;
    }

    //등록 요청 - 아파트 등록 요청 회원 목록 보기 = GET
    @GetMapping("/apts/apt-manager")
    public ResponseEntity<RegisterAptManagersResponse> viewAptRegisterManagers(Pageable pageable) {
        return ResponseEntity.ok().body(aptService.viewAptRegisterManagers(pageable));
    }
}
