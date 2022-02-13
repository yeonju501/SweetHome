package com.sweet.home.member.controller;

import com.sweet.home.member.controller.dto.request.CheckDuplicateRequest;
import com.sweet.home.member.controller.dto.request.FindPasswordRequest;
import com.sweet.home.member.controller.dto.request.MemberSaveRequest;
import com.sweet.home.member.controller.dto.response.CheckDuplicateResponse;
import com.sweet.home.member.service.MemberService;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MemberRestController {

    private final MemberService memberService;

    public MemberRestController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/members/join")
    public ResponseEntity<Void> join(@RequestBody MemberSaveRequest request) {
        Long joinMemberId = memberService.saveAssociateMember(request);
        URI uri = URI.create("/api/members/" + joinMemberId);
        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping("/members")
    public ResponseEntity<Void> resignMember(@AuthenticationPrincipal String email) {
        memberService.resignMember(email);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/members/find-pw")
    public ResponseEntity<Void> findPassword(@RequestBody FindPasswordRequest request) {
        memberService.findPassword(request);
        URI uri = URI.create("/api/members/");
        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/members/exist-email")
    public ResponseEntity<CheckDuplicateResponse> checkDuplicateEmail(@RequestBody CheckDuplicateRequest request) {
        return ResponseEntity.ok().body(memberService.checkDuplicateEmail(request));
    }

    @PostMapping("/members/exist-name")
    public ResponseEntity<CheckDuplicateResponse> checkDuplicateUsername(@RequestBody CheckDuplicateRequest request) {
        return ResponseEntity.ok().body(memberService.checkDuplicateUsername(request));
    }
}
