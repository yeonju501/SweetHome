package com.sweet.home.member.service;

import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.controller.dto.request.CheckDuplicateRequest;
import com.sweet.home.member.controller.dto.request.ProfileUpdateRequest;
import com.sweet.home.member.controller.dto.response.CheckDuplicateResponse;
import com.sweet.home.member.controller.dto.response.ProfileResponse;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.domain.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public ProfileService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public ProfileResponse viewProfile(String email) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
        return ProfileResponse.from(member);
    }

    @Transactional
    public void updateProfile(String email, ProfileUpdateRequest request) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));

        if (!member.getUsername().equals(request.getUsername()) && memberRepository.existsByUsername(request.getUsername())) {
            throw new BusinessException(ErrorCode.MEMBER_USERNAME_DUPLICATED);
        }

        member.changePassword(passwordEncoder, request.getPassword());
        member.changeUsername(request.getUsername());
        member.changePhoneNumber(request.getPhoneNumeber());
        memberRepository.save(member);
    }

    @Transactional(readOnly = true)
    public CheckDuplicateResponse checkDuplicateUsernameUpdate(String email, CheckDuplicateRequest request) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));

        if (member.getUsername().equals(request.getValue())) {
            return CheckDuplicateResponse.from(false);
        }

        return CheckDuplicateResponse.from(memberRepository.existsByUsername(request.getValue()));
    }

}
