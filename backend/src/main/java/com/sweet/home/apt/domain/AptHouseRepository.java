package com.sweet.home.apt.domain;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AptHouseRepository extends JpaRepository<AptHouse, Long> {

    Optional<AptHouse> findByAptAndDongAndHo(Apt apt, String dong, String ho);
}
