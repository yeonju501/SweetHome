package com.sweet.home.message.domain;

import com.sweet.home.global.domain.BaseEntity;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class MessageContent extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_content_id")
    private Long id;

    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @Column(name = "content", length = 400, nullable = false)
    private String content;

    @Column(name = "read_at", nullable = true)
    private LocalDateTime readAt;

    protected MessageContent() {
    }

    @Builder
    public MessageContent(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public static MessageContent createMessageContent(String title, String content) {
        return MessageContent.builder()
            .title(title)
            .content(content)
            .build();
    }

    public void changeReadAt() {
        this.readAt = LocalDateTime.now();
    }
}
