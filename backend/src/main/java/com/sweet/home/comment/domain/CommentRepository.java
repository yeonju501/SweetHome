package com.sweet.home.comment.domain;

import com.sweet.home.article.domain.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @EntityGraph(attributePaths = {"article"}, type = EntityGraphType.FETCH)
    Page<Comment> findAllByParentIsNullAndArticle(Article article, Pageable pageable);
}
