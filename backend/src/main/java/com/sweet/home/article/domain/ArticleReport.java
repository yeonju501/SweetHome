package com.sweet.home.article.domain;

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

@Getter
@Entity
@Where(clause = "deleted_at is null")
public class ArticleReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_report_id")
    private Long id;

    @ManyToOne(targetEntity = Article.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "content")
    private String content;

    protected ArticleReport() {
    }

    @Builder
    public ArticleReport(Article article, Member member, String content) {
        this.article = article;
        this.member = member;
        this.content = content;
    }
}
