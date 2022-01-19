package com.sweet.home.member.controller;

import static com.sweet.home.member.util.MemberFixture.EMAIL;
import static com.sweet.home.member.util.MemberFixture.PASSWORD;
import static com.sweet.home.member.util.MemberFixture.PHONE_NUMBER;
import static com.sweet.home.member.util.MemberFixture.USERNAME;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sweet.home.member.controller.dto.request.MemberSaveRequest;
import com.sweet.home.member.util.MemberFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

@SpringBootTest
@AutoConfigureMockMvc
class MemberRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper objectMapper = new ObjectMapper();

    @Test
    @DisplayName("POST /api/members/join")
    void joinTest() throws Exception {

        // given
        MemberSaveRequest request = MemberFixture.createMemberSaveRequest(EMAIL, PASSWORD, USERNAME, PHONE_NUMBER);
        String json = objectMapper.writeValueAsString(request);

        // when
        ResultActions resultActions = mockMvc.perform(post("/api/members/join")
            .contentType(MediaType.APPLICATION_JSON)
            .content(json))
            .andDo(print());

        // then
        resultActions
            .andExpect(status().isCreated())
            .andExpect(header().string("Location", "/api/members/1"))
        ;
    }
}