package com.sweet.home.member.service;

import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.mockito.Mockito.when;

import com.sweet.home.member.controller.dto.request.MemberSaveRequest;
import com.sweet.home.member.domain.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

    private static final String EMAIL = "email@email.com";
    private static final String PASSWORD = "PASSword123!@";
    private static final String USERNAME = "username";
    private static final String PHONE_NUMBER = "01012345678";

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private MemberService memberService;

    private MemberSaveRequest memberSaveRequest;

    @BeforeEach
    void setup() {
        memberSaveRequest = new MemberSaveRequest(EMAIL, PASSWORD, USERNAME, PHONE_NUMBER);
    }

    @Test
    @DisplayName("이미 존재하는 이메일이 있을 때 로그인요청을 할 경우 exception이 발생해야 한다.")
    void saveMemberExceptionByDuplicatedEmail() {

        // setup & given
        when(memberRepository.existsByEmail(EMAIL)).thenReturn(true);

        // when & then
        assertThatExceptionOfType(RuntimeException.class)
            .isThrownBy(() -> memberService.saveMember(memberSaveRequest))
            .withMessageMatching("이미 존재하는 이메일 입니다.");
    }
}