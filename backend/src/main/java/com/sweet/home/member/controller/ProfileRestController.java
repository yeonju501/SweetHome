package com.sweet.home.member.controller;

import com.sweet.home.member.controller.dto.request.ProfileUpdateRequest;
import com.sweet.home.member.controller.dto.response.ProfileResponse;
import com.sweet.home.member.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProfileRestController {

    private final ProfileService profileService;

    public ProfileRestController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/members/my-profile")
    public ResponseEntity<ProfileResponse> viewMyProfile(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok().body(profileService.viewProfile(email));
    }

    @PutMapping("/members/my-profile")
    public ResponseEntity<Void> updateMyProfile(@AuthenticationPrincipal String email, @RequestBody ProfileUpdateRequest request) {
        profileService.updateProfile(email, request);
        return ResponseEntity.ok().build();
    }
}
