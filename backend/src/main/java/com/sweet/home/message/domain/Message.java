package com.sweet.home.message.domain;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
public class Message {
    @Id
    @GeneratedValue
    @Column(name = "message_id")
    private Long id;

    @Column(name = "message_content_id")
    private Long messageContentId;

    @Column(name = "send_member_id")
    private Long sendMemberId;

    @Column(name = "receive_member_id")
    private Long receiveMemberId;

    @Column(name = "sender_receiver_delimiter")
    private SenderReceiverDelimiter senderReceiverDelimiter;

    @Column(name = "deleted_at", nullable = true)
    private LocalDateTime deletedAt;
}
