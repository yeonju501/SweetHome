package com.sweet.home.apt.domain;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AptRepository extends JpaRepository<Apt, Long> {
    Optional<Apt> findByAptNumber(String aptNumber);
}
