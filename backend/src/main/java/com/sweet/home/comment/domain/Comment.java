package com.sweet.home.comment.domain;

import com.sweet.home.article.domain.Article;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.reply.domain.Reply;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Getter
@Entity
@Where(clause = "deleted_at is null and blocked_at is null")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(targetEntity = Article.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "content", nullable = false)
    private String content;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = true)
    private LocalDateTime updatedAt;

    @Column(name = "blocked_at", nullable = true)
    private LocalDateTime blockedAt;

    @Column(name = "deleted_at", nullable = true)
    private LocalDateTime deletedAt;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(select count(1) from comment_like cl where cl.comment_id = comment_id)")
    private long totalLikes;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(select count(1) from comment_report cr where cr.comment_id = comment_id)")
    private long totalReports;

    @OneToMany(mappedBy = "comment", targetEntity = Reply.class, fetch = FetchType.LAZY)
    private List<Reply> replies;

    private static final int BLOCK_STANDARD = 5;

    protected Comment() {
    }

    @Builder
    public Comment(Article article, Member member, String content) {
        this.article = article;
        this.member = member;
        this.content = content;
    }

    public void checkCommentByEmail(String email) {
        if (!member.getEmail().equals(email)) {
            throw new BusinessException(ErrorCode.COMMENT_NOT_MATCH_BY_MEMBER_EMAIL);
        }
    }

    public void changeContent(String content) {
        if (!Objects.isNull(content)) {
            this.content = content;
        }
    }

    public void deleteComment() {
        this.deletedAt = LocalDateTime.now();
    }

    public void checkTotalReports() {
        if (this.totalReports >= BLOCK_STANDARD) {
            this.blockedAt = LocalDateTime.now();
        }
    }
}
