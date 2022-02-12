package com.sweet.home.member.domain;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    Optional<Member> findByEmail(String email);

    Optional<Member> findByUsername(String username);

    @Query (nativeQuery = true, value = "select * "
        + "from member m "
        + "join apt_house ah on m.apt_house_id = ah.apt_house_id "
        + "where ah.apt_id = (:aptId)")
    Page<Member> findByAptId(@Param("aptId") Long aptId, Pageable pageable);
}
