package com.sweet.home.article.domain;

import com.sweet.home.member.domain.Member;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Article {

    @Id
    @GeneratedValue
    @Column(name = "article_id")
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

//    @ManyToOne(targetEntity = Board.class, fetch = FetchType.LAZY)
//    @JoinColumn(name = "board_id")
//    private Board board;

    @Column(name = "content", nullable = false)
    private String content;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = true)
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at", nullable = true)
    private LocalDateTime deletedAt;

    protected Article() {
    }

    @Builder
    public Article(String title, String content, Member member){
        this.title = title;
        this.content = content;
        this.member = member;
    }
}
