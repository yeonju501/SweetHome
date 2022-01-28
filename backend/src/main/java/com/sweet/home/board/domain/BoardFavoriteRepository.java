package com.sweet.home.board.domain;

import com.sweet.home.member.domain.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardFavoriteRepository extends JpaRepository<BoardFavorite, Long> {

    List<BoardFavorite> findAllByMember(Member member);
}
