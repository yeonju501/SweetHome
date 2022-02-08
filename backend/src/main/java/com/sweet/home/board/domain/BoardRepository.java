package com.sweet.home.board.domain;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoardRepository extends JpaRepository<Board, Long> {

    Page<Board> findAllByBoardStatusIsNull(Pageable pageable);

    Optional<Board> findByIdAndBoardStatusIsNull(Long boardId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update board_favorite bf set bf.deleted_at = current_timestamp where bf.board_id = (:id) and bf.deleted_at is null")
    int DeleteBoardFavorites(@Param("id") Long id);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update article a set a.deleted_at = current_timestamp where a.board_id = (:id) and a.deleted_at is null")
    int DeleteArticles(@Param("id") Long id);

}
