package com.sweet.home.message.domain;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class MessageContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_content_id")
    private Long id;

    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @Column(name = "content", length = 400, nullable = false)
    private String content;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

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
