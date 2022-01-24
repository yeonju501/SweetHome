package com.sweet.home.message.domain;

import com.sweet.home.member.domain.Member;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Message {
    @Id
    @GeneratedValue
    @Column(name = "message_id")
    private Long id;

    @ManyToOne(targetEntity = MessageContent.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "message_content_id")
    private MessageContent messageContentId;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "send_member_id")
    private Member sendMemberId;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "receive_member_id")
    private Member receiveMemberId;

    @Column(name = "sender_receiver_delimiter")
    private SenderReceiverDelimiter senderReceiverDelimiter;

    @Column(name = "deleted_at", nullable = true)
    private LocalDateTime deletedAt;

    public Message() {
    }

    @Builder
    public Message(Long id, MessageContent messageContentId, Member sendMemberId, Member receiveMemberId, SenderReceiverDelimiter senderReceiverDelimiter, LocalDateTime deletedAt) {
        this.id = id;
        this.messageContentId = messageContentId;
        this.sendMemberId = sendMemberId;
        this.receiveMemberId = receiveMemberId;
        this.senderReceiverDelimiter = senderReceiverDelimiter;
        this.deletedAt = deletedAt;
    }

    public static Message createSendMessage(Member sender, Member receiver, MessageContent messageContentId) {
        return Message.builder()
                .sendMemberId(sender)
                .receiveMemberId(receiver)
                .messageContentId(messageContentId)
                .senderReceiverDelimiter(SenderReceiverDelimiter.sender)
                .build();
    }

    public static Message createReceiveMessage(Member sender, Member receiver, MessageContent messageContentId) {
        return Message.builder()
                .sendMemberId(sender)
                .receiveMemberId(receiver)
                .messageContentId(messageContentId)
                .senderReceiverDelimiter(SenderReceiverDelimiter.receiver)
                .build();
    }
}
