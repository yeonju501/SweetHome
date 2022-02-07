package com.sweet.home.apt.domain;

import com.sweet.home.member.domain.Member;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegisterAptHouseRepository extends JpaRepository<RegisterAptHouse, Long> {

    boolean existsByMember(Member member);

    Optional<RegisterAptHouse> findByMember(Member member);

    @EntityGraph(attributePaths = {"member"}, type = EntityGraphType.FETCH)
    Page<RegisterAptHouse> findByApt(Apt apt, Pageable pageable);
}
