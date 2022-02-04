package com.sweet.home.article.domain;

import com.sweet.home.member.domain.Member;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleLikeRepository extends JpaRepository<ArticleLike, Long> {

    boolean existsByMemberAndArticle(Member member, Article article);

    Optional<ArticleLike> findByMemberAndArticle(Member member, Article article);

    @EntityGraph(attributePaths = {"member"}, type = EntityGraphType.FETCH)
    Page<ArticleLike> findAllByMember(Member member, Pageable pageable);
}
