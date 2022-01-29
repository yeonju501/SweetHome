package com.sweet.home.article.domain;

import com.sweet.home.board.domain.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    @EntityGraph(attributePaths = {"board"}, type = EntityGraphType.FETCH)
    Page<Article> findAllByBoard(Board board, Pageable pageable);
}
