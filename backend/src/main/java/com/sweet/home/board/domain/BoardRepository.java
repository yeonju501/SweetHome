package com.sweet.home.board.domain;

import com.sweet.home.apt.domain.Apt;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {

    Page<Board> findAllByBoardStatusIsNullAndApt(Pageable pageable, Apt apt);

    List<Board> findAllByBoardStatusIsNotNullAndApt(Apt apt);

    Optional<Board> findByIdAndBoardStatusIsNull(Long boardId);

    List<Board> findAllByAptIdAndBoardStatusIsNotNull(Long aptId);
}
