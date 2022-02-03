package com.sweet.home.comment.domain;

import com.sweet.home.global.domain.BaseEntity;
import com.sweet.home.member.domain.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class CommentReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_report_id")
    private Long id;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(targetEntity = Comment.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @Column(name = "content")
    private String content;

    protected CommentReport() {

    }

    @Builder
    public CommentReport(Member member, Comment comment, String content) {
        this.member = member;
        this.comment = comment;
        this.content = content;
    }
}
