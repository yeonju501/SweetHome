package com.sweet.home.member.service;

import static com.sweet.home.member.util.MemberFixture.EMAIL;
import static com.sweet.home.member.util.MemberFixture.PASSWORD;
import static com.sweet.home.member.util.MemberFixture.PHONE_NUMBER;
import static com.sweet.home.member.util.MemberFixture.USERNAME;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.sweet.home.member.controller.dto.request.MemberSaveRequest;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.domain.MemberRepository;
import com.sweet.home.member.util.MemberFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private MemberService memberService;

    private MemberSaveRequest memberSaveRequest;

    @BeforeEach
    void setup() {
        memberSaveRequest = MemberFixture.createMemberSaveRequest(EMAIL, PASSWORD, USERNAME, PHONE_NUMBER);
    }

    @Test
    @DisplayName("이미 존재하는 이메일이 있을 때 로그인요청을 할 경우 exception이 발생해야 한다.")
    void saveMemberExceptionByDuplicatedEmailTest() {

        // setup & given
        when(memberRepository.existsByEmail(EMAIL)).thenReturn(true);

        // when & then
        assertThatExceptionOfType(RuntimeException.class)
            .isThrownBy(() -> memberService.saveMember(memberSaveRequest))
            .withMessageMatching("이미 존재하는 이메일 입니다.");
    }

    @Test
    @DisplayName("회원 가입을할 경우 저장된 id를 반환할 수 있다.")
    void saveMemberTest() {

        // setup & given
        when(memberRepository.existsByEmail(EMAIL)).thenReturn(false);
        Member member = memberSaveRequest.toEntity();
        ReflectionTestUtils.setField(member, "id", 1L);
        when(memberRepository.save(any())).thenReturn(member);

        // when
        Long result = memberService.saveMember(memberSaveRequest);

        // then
        assertThat(result).isEqualTo(1L);
    }
}