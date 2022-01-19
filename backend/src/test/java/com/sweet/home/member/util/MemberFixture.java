package com.sweet.home.member.util;

import com.sweet.home.member.controller.dto.request.MemberSaveRequest;

public class MemberFixture {

    public static final String EMAIL = "email@email.com";
    public static final String PASSWORD = "PASSword123!@";
    public static final String USERNAME = "username";
    public static final String PHONE_NUMBER = "01012345678";

    public static MemberSaveRequest createMemberSaveRequest(String email, String password, String username, String phoneNumber) {
        return new MemberSaveRequest(email, password, username, phoneNumber);
    }
}
