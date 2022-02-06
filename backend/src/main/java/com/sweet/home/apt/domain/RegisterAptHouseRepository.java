package com.sweet.home.apt.domain;

import com.sweet.home.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegisterAptHouseRepository extends JpaRepository<RegisterAptHouse, Long> {
    boolean existsByMember(Member member);
}
