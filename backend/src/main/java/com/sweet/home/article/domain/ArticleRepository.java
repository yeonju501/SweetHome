package com.sweet.home.article.domain;

import com.sweet.home.board.domain.Board;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findAllByBoard(Board board);

    Article findByBoardAndId(Board board, Long articleId);
}
