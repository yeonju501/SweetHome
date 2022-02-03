package com.sweet.home.comment.domain;

import com.sweet.home.global.domain.BaseEntity;
import com.sweet.home.member.domain.Member;
import java.time.LocalDateTime;
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
import org.springframework.data.annotation.CreatedDate;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class CommentLike extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_like_id")
    private Long id;

    @ManyToOne(targetEntity = Comment.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    protected CommentLike() {
    }

    @Builder
    public CommentLike(Comment comment, Member member) {
        this.comment = comment;
        this.member = member;
    }
}
