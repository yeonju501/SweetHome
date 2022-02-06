package com.sweet.home.comment.domain;

import com.sweet.home.article.domain.Article;
import com.sweet.home.global.domain.BaseEntity;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

@Getter
@Entity
@Where(clause = "deleted_at is null and blocked_at is null")
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @ManyToOne(targetEntity = Article.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "blocked_at", nullable = true)
    private LocalDateTime blockedAt;

    @Column(name = "is_removed")
    private Boolean isRemoved;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(select count(1) from comment_like cl where cl.comment_id = comment_id and cl.deleted_at is null)")
    private int totalLikes;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(select count(1) from comment_report cr where cr.comment_id = comment_id and cr.deleted_at is null)")
    private int totalReports;

    @OneToMany(mappedBy = "parent")
    private List<Comment> childList = new ArrayList<>();

    private static final int BLOCK_STANDARD = 5;

    protected Comment() {
    }

    @Builder
    public Comment(Comment parent, Article article, Member member, String content) {
        this.parent = parent;
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

    public void checkTotalReports() {
        if (this.totalReports >= BLOCK_STANDARD) {
            this.blockedAt = LocalDateTime.now();
        }
    }

    public boolean checkParentOrChild() {
        if (Objects.isNull(this.getParent())) {
            return true;
        }
        return false;
    }

    public boolean hasChildList() {
        return this.getChildList().stream()
            .anyMatch(c -> Objects.isNull(c.getDeletedAt()));
    }

    public void removeComment() {
        this.isRemoved = true;
    }

    public void deleteComment() {
        if (this.checkParentOrChild() && this.hasChildList()) {
            this.removeComment();
            return;
        }
        this.saveDeletedTime();
        if (!this.checkParentOrChild() && Objects.nonNull(this.getParent().getIsRemoved()) && !this.getParent().hasChildList()) {
            this.getParent().saveDeletedTime();
        }
    }
}
