package com.sweet.home.message.service;

import com.sweet.home.message.domain.MessageRepository;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository){
        this.messageRepository = messageRepository;
    }

    // 메세지 보내기
}
