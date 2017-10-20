package com.perfectsense.blog.repository;

import com.perfectsense.blog.domain.Comment;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Comment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByBlogId(long id);


}
