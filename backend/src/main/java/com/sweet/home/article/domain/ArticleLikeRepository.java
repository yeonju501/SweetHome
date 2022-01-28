package com.sweet.home.article.domain;

import com.sweet.home.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleLikeRepository extends JpaRepository<ArticleLike, Long> {

    boolean existsByMemberAndArticle(Member member, Article article);
}