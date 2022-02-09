package com.sweet.home.apt.domain;

import com.sweet.home.member.domain.Member;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegisterAptManagerRepository extends JpaRepository<RegisterAptManager, Long> {

    boolean existsByMember(Member member);

    Optional<RegisterAptManager> findByMember(Member member);

    @EntityGraph(attributePaths = {"member", "apt"}, type = EntityGraphType.FETCH)
    Page<RegisterAptManager> findAll(Pageable pageable);
}