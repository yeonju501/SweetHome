package com.sweet.home.agreement.domain;

import com.sweet.home.apt.domain.AptHouse;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgreedHouseRepository extends JpaRepository<AgreedHouse, Long> {

    List<AgreedHouse> findByAgreement(Agreement agreement);

    boolean existsByAptHouse(AptHouse aptHouse);
}
