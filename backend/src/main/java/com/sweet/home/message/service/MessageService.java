package com.sweet.home.message.service;

import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import com.sweet.home.message.controller.dto.request.MessageSendRequest;
import com.sweet.home.message.domain.Message;
import com.sweet.home.message.domain.MessageContent;
import com.sweet.home.message.domain.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final MemberService memberService;

    public MessageService(MessageRepository messageRepository, MemberService memberService) {
        this.messageRepository = messageRepository;
        this.memberService = memberService;
    }

    // 메세지 보내기
    @Transactional
    public Long sendMessage(MessageSendRequest request) {
        Member sender = memberService.findByUsername(request.getSender());
        Member receiver = memberService.findByUsername(request.getReceiver());

        // 메세지 콘텐트 만들기
        MessageContent messageContent = request.toCreateMessageContent();

        // 보낸 메시지함에 보관
        Message message = Message.createSendMessage(sender, receiver, messageContent);

        // 받는 사람의 받은 메시지함에 보관
        messageRepository.save(Message.createReceiveMessage(sender, receiver, messageContent));

        return messageRepository.save(message).getId();
    }
}
