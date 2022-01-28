package com.sweet.home.board.domain;

import com.sweet.home.member.domain.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardFavoriteRepository extends JpaRepository<BoardFavorite, Long> {

    @EntityGraph(attributePaths = {"member"}, type = EntityGraphType.FETCH)
    List<BoardFavorite> findAllByMember(Member member);

    Optional<BoardFavorite> findByMemberAndBoard(Member member, Board board);

    boolean existsByMemberAndBoard(Member member, Board board);
}
