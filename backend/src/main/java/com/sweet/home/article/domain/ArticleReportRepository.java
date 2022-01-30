package com.sweet.home.article.domain;

import com.sweet.home.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleReportRepository extends JpaRepository<ArticleReport, Long> {

    boolean existsByMemberAndArticle(Member member, Article article);
}
