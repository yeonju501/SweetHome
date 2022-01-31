package com.sweet.home.building.service;

import com.sweet.home.building.domain.BuildingHouseMember;
import com.sweet.home.building.domain.BuildingHouseMemberRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BuildingHouseMemberService {
    private final BuildingHouseMemberRepository buildingHouseMemberRepository;

    public BuildingHouseMemberService(BuildingHouseMemberRepository buildingHouseMemberRepository) {
        this.buildingHouseMemberRepository = buildingHouseMemberRepository;
    }

    @Transactional(readOnly = true)
    public BuildingHouseMember findByMember(Member member){
        return buildingHouseMemberRepository.findByMember(member)
            .orElseThrow(() -> new BusinessException(ErrorCode.BUILDING_HOUSE_MEMBER_NOT_FOUND_ID));
    }
}
