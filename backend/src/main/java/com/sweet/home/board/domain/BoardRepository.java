package com.sweet.home.board.domain;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoardRepository extends JpaRepository<Board, Long> {

    Page<Board> findAllByBoardStatusIsNull(Pageable pageable);

    List<Board> findAllByBoardStatusIsNotNull();

    Optional<Board> findByIdAndBoardStatusIsNull(Long boardId);
}
