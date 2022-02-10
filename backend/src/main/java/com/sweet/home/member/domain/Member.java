package com.sweet.home.member.domain;

import com.sweet.home.apt.domain.Apt;
import com.sweet.home.apt.domain.AptHouse;
import com.sweet.home.auth.domain.Authority;
import com.sweet.home.global.domain.BaseEntity;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @ManyToOne(targetEntity = AptHouse.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "apt_house_id")
    private AptHouse aptHouse;

    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Column(name = "username", length = 20, nullable = false)
    private String username;

    @Column(name = "phone_number", length = 11)
    private String phoneNumber;

    @Column(name = "kakao_id")
    private String kakaoId;

    @Enumerated(EnumType.STRING)
    @Column(name = "authority")
    private Authority authority;

    protected Member() {
    }

    @Builder
    public Member(String email, String password, String username, String phoneNumber, String kakaoId, Authority authority) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.kakaoId = kakaoId;
        this.authority = authority;
    }

    public static Member createAssociateMember(String email, String password, String username, String phoneNumber) {
        return Member.builder()
            .email(email)
            .password(password)
            .username(username)
            .phoneNumber(phoneNumber)
            .authority(Authority.ROLE_ASSOCIATE_MEMBER)
            .build();
    }

    public void encodePassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void login(PasswordEncoder passwordEncoder, String password) {
        if (!passwordEncoder.matches(password, this.password)) {
            throw new BusinessException(ErrorCode.MEMBER_LOGIN_ERROR_BY_PASSWORD);
        }
    }

    public void changePassword(PasswordEncoder passwordEncoder, String password) {
        if (!Objects.isNull(password)) {
            this.password = passwordEncoder.encode(password);
        }
    }

    public void changeUsername(String username) {
        if (!Objects.isNull(username)) {
            this.username = username;
        }
    }

    public void changePhoneNumber(String phoneNumber) {
        if (!Objects.isNull(phoneNumber)) {
            this.phoneNumber = phoneNumber;
        }
    }

    public void changeAptHouse(AptHouse aptHouse) {
        this.aptHouse = aptHouse;
    }

    public void changeAuthority(Authority authority) {
        if (!Objects.isNull(authority)) {
            this.authority = authority;
        }
    }

    public void checkAptMember(Apt apt) {
        if (!this.aptHouse.getApt().getId().equals(apt.getId())) {
            throw new BusinessException(ErrorCode.APT_NOT_HIS_APT);
        }
    }
}
