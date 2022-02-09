package com.sweet.home.apt.controller;

import com.sweet.home.apt.controller.dto.request.AptManagerRequest;
import com.sweet.home.apt.controller.dto.response.RegisterAptManagersResponse;
import com.sweet.home.apt.service.AptService;
import java.net.URI;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/superadmin")
public class AptSuperAdminRestController {

    private final AptService aptService;

    public AptSuperAdminRestController(AptService aptService) {
        this.aptService = aptService;
    }

    // 아파트 관리자 등록 요청 목록보기 = GET
    @GetMapping("/apts/apt-manager")
    public ResponseEntity<RegisterAptManagersResponse> viewAptRegisterManagers(Pageable pageable) {
        return ResponseEntity.ok().body(aptService.viewAptRegisterManagers(pageable));
    }

    // 아파트 관리자 등록 승인하기 = POST
    @PostMapping("/apts/apt-manager")
    public ResponseEntity<Void> allowAptManager(@RequestBody AptManagerRequest request) {
        aptService.allowAptManager(request);
        URI uri = URI.create("/api/apt-manager/");
        return ResponseEntity.created(uri).build();
    }

    // 아파트 관리자 등록 거절하기 = DELETE
//    @DeleteMapping("/apts/apt-manager")
}
