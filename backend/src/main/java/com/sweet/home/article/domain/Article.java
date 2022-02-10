package com.sweet.home.article.domain;

import com.sweet.home.board.domain.Board;
import com.sweet.home.global.domain.BaseEntity;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import java.util.Objects;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Where(clause = "deleted_at is null and blocked_at is null")
public class Article extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(targetEntity = Board.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "blocked_at", nullable = true)
    private LocalDateTime blockedAt;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(select count(1) from article_like al where al.article_id = article_id and al.deleted_at is null)")
    private int totalLikes;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(select count(1) from article_report ar where ar.article_id = article_id and ar.deleted_at is null)")
    private int totalReports;

    private static final int BLOCK_STANDARD = 5;

    protected Article() {
    }

    @Builder
    public Article(String title, String content, Member member, Board board) {
        this.title = title;
        this.content = content;
        this.member = member;
        this.board = board;
    }

    public void checkArticleByEmail(String email) {
        if (!member.getEmail().equals(email)) {
            throw new BusinessException(ErrorCode.ARTICLE_NOT_MATCH_BY_EMAIL);
        }
    }

    public void changeTitle(String title) {
        if (!Objects.isNull(title)) {
            this.title = title;
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
}
