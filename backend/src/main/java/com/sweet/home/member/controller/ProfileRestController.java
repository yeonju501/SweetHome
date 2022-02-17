package com.sweet.home.member.controller;

import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.image.ImageUploader;
import com.sweet.home.member.controller.dto.request.CheckDuplicateRequest;
import com.sweet.home.member.controller.dto.request.ProfileUpdateRequest;
import com.sweet.home.member.controller.dto.response.CheckDuplicateResponse;
import com.sweet.home.member.controller.dto.response.ProfileResponse;
import com.sweet.home.member.service.ProfileService;
import java.io.IOException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class ProfileRestController {

    private final ProfileService profileService;
    private final ImageUploader imageUploader;

    public ProfileRestController(ProfileService profileService, ImageUploader imageUploader) {
        this.profileService = profileService;
        this.imageUploader = imageUploader;
    }

    @GetMapping("/members/my-profile")
    public ResponseEntity<ProfileResponse> viewMyProfile(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok().body(profileService.viewProfile(email));
    }

    @PutMapping("/members/my-profile")
    public ResponseEntity<Void> updateMyProfile(@AuthenticationPrincipal String email,
        @RequestPart(value = "image", required = false) MultipartFile file, @RequestPart(value = "profile") ProfileUpdateRequest request) {
        String url = null;
        if (!file.isEmpty()){
            try{
                url = imageUploader.upload(file, "profile");
            } catch (IOException e) {
                throw new BusinessException(ErrorCode.GLOBAL_ILLEGAL_ERROR);
            }
        }
        profileService.updateProfile(email, request, url);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/members/my-profile/exist-name")
    public ResponseEntity<CheckDuplicateResponse> checkDuplicateUsernameUpdate(@AuthenticationPrincipal String email,
        @RequestBody CheckDuplicateRequest request) {
        return ResponseEntity.ok().body(profileService.checkDuplicateUsernameUpdate(email, request));
    }
}
