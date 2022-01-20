package com.sweet.home.member.domain;

import com.sweet.home.auth.domain.Authority;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Getter
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Column(name = "username", length = 20, nullable = false)
    private String username;

    @Column(name = "phone_number", length = 11, nullable = false)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "authority")
    private Authority authority;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = true)
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at", nullable = true)
    private LocalDateTime deletedAt;

    protected Member() {
    }

    @Builder
    public Member(String email, String password, String username, String phoneNumber, Authority authority) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.phoneNumber = phoneNumber;
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
        if (passwordEncoder.matches(password, this.password)) {
            this.password = passwordEncoder.encode(password);
        }
    }

    public void changeUsername(String username) {
        if (!Objects.isNull(username)) {
            this.username = username;
        }
    }

    public void changePhoneNumber(String phoneNumber) {
        if (!Objects.isNull(phoneNumber)){
            this.phoneNumber = phoneNumber;
        }
    }

    public void resignMember() {
        this.deletedAt = LocalDateTime.now();
    }
}
