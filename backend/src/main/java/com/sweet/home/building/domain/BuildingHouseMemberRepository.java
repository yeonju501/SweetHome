package com.sweet.home.building.domain;

import com.sweet.home.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildingHouseMemberRepository extends JpaRepository<BuildingHouseMember, Long> {

    @EntityGraph(attributePaths = {"buildingHouse"}, type = EntityGraphType.FETCH)
    Optional<BuildingHouseMember> findByMember(Member member);
}
