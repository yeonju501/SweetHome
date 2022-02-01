package com.sweet.home.reply.domain;

import com.sweet.home.comment.domain.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    @EntityGraph(attributePaths = {"comment"}, type = EntityGraphType.FETCH)
    Page<Reply> findAllByComment(Comment comment, Pageable pageable);

}
