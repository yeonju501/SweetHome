package com.sweet.home.message.domain;

import com.sweet.home.member.domain.Member;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;

    @ManyToOne(targetEntity = MessageContent.class, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "message_content_id")
    private MessageContent messageContent;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "send_member_id")
    private Member sendMember;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "receive_member_id")
    private Member receiveMember;

    @Enumerated(EnumType.STRING)
    @Column(name = "sender_receiver_delimiter")
    private SenderReceiverDelimiter senderReceiverDelimiter;

    @Column(name = "deleted_at", nullable = true)
    private LocalDateTime deletedAt;

    protected Message() {
    }

    @Builder
    public Message(MessageContent messageContent, Member sendMember, Member receiveMember,
        SenderReceiverDelimiter senderReceiverDelimiter) {
        this.messageContent = messageContent;
        this.sendMember = sendMember;
        this.receiveMember = receiveMember;
        this.senderReceiverDelimiter = senderReceiverDelimiter;
    }

    public static List<Message> createMessage(Member sender, Member receiver, MessageContent messageContent) {
        return Arrays.asList(
            Message.createSendMessage(sender, receiver, messageContent),
            Message.createReceiveMessage(sender, receiver, messageContent)
        );
    }

    public static Message createSendMessage(Member sender, Member receiver, MessageContent messageContent) {
        return Message.builder()
            .sendMember(sender)
            .receiveMember(receiver)
            .messageContent(messageContent)
            .senderReceiverDelimiter(SenderReceiverDelimiter.SENDER)
            .build();
    }

    public static Message createReceiveMessage(Member sender, Member receiver, MessageContent messageContent) {
        return Message.builder()
            .sendMember(sender)
            .receiveMember(receiver)
            .messageContent(messageContent)
            .senderReceiverDelimiter(SenderReceiverDelimiter.RECEIVER)
            .build();
    }

    public void deleteMessage() {
        this.deletedAt = LocalDateTime.now();
    }
}
