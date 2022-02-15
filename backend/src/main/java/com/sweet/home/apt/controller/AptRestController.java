package com.sweet.home.apt.controller;

import com.sweet.home.apt.controller.dto.request.RegisterAptHouseRequest;
import com.sweet.home.apt.controller.dto.request.RegisterAptManagerRequest;
import com.sweet.home.apt.controller.dto.response.AptResponse;
import com.sweet.home.apt.controller.dto.response.MyRegisterAptHouseResponse;
import com.sweet.home.apt.controller.dto.response.MyRegisterAptManagerResponse;
import com.sweet.home.apt.service.AptService;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/apts/{apt_id}")
    public ResponseEntity<AptResponse> viewApt(@PathVariable(value = "apt_id") Long aptId){
        return ResponseEntity.ok().body(aptService.viewApt(aptId));
    }

    //등록 요청 - 회원의 아파트 세대원 등록 요청 = POST
    @PostMapping("/apts/register")
    public ResponseEntity<Void> createRegisterApt(@AuthenticationPrincipal String email,
        @RequestBody RegisterAptHouseRequest request) {
        aptService.createRegisterApt(email, request);
        URI uri = URI.create("/api/register/");
        return ResponseEntity.created(uri).build();
    }

    //등록 요청 - 회원의 아파트 세대원 등록 취소 = DELETE
    @DeleteMapping("/apts/register")
    public ResponseEntity<Void> deleteRegisterApt(@AuthenticationPrincipal String email) {
        aptService.deleteRegisterApt(email);
        return ResponseEntity.noContent().build();
    }

    //등록 요청 - 현재 세대원 등록 요청중인 아파트 보기 = GET
    @GetMapping("/apts/register")
    public ResponseEntity<MyRegisterAptHouseResponse> viewMyRegisterApt(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok().body(aptService.viewMyRegisterApt(email));
    }

    // 아파트 관리자 등록 요청 - 회원의 아파트 관리자 등록 요청 = POST
    @PostMapping("/apts/apt-manager")
    public ResponseEntity<Void> createRegisterAptManager(@AuthenticationPrincipal String email,
        @RequestBody RegisterAptManagerRequest request) {
        aptService.createRegisterAptManager(email, request);
        URI uri = URI.create("/api/apt-manager/");
        return ResponseEntity.created(uri).build();
    }

    //아파트 관리자 등록 요청 - 현재 아파트 관리자 요청 보기 = GET
    @GetMapping("/apts/apt-manager")
    public ResponseEntity<MyRegisterAptManagerResponse> viewMyRegisterManager(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok().body(aptService.viewMyRegisterManager(email));
    }

    //아파트 관리자 등록 요청 - 현재 아파트 관리자 요청 취소 = DELETE
    @DeleteMapping("/apts/apt-manager")
    public ResponseEntity<Void> deleteRegisterAptManager(@AuthenticationPrincipal String email) {
        aptService.deleteRegisterAptManager(email);
        return ResponseEntity.noContent().build();
    }
}
