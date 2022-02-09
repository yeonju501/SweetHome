package com.sweet.home.board.domain;

import com.sweet.home.member.domain.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoardFavoriteRepository extends JpaRepository<BoardFavorite, Long> {

    @EntityGraph(attributePaths = {"member"}, type = EntityGraphType.FETCH)
    List<BoardFavorite> findAllByMember(Member member);

    Optional<BoardFavorite> findByMemberAndBoard(Member member, Board board);

    boolean existsByMemberAndBoard(Member member, Board board);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update board_favorite bf set bf.deleted_at = current_timestamp where bf.board_id = (:id) and bf.deleted_at is null")
    int deleteBoardFavoritesByBoard(@Param("id") Long id);
}
