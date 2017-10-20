package com.perfectsense.blog.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Blog.
 */
@Entity
@Table(name = "blog")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Blog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "blog_post")
    private String blogPost;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @OneToMany(mappedBy = "blog")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comment> comments = new HashSet<>();

    @ManyToOne
    private Author author;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Blog title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBlogPost() {
        return blogPost;
    }

    public Blog blogPost(String blogPost) {
        this.blogPost = blogPost;
        return this;
    }

    public void setBlogPost(String blogPost) {
        this.blogPost = blogPost;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Blog date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public byte[] getImage() {
        return image;
    }

    public Blog image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Blog imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Blog comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Blog addComment(Comment comment) {
        this.comments.add(comment);
        comment.setBlog(this);
        return this;
    }

    public Blog removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.setBlog(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Author getAuthor() {
        return author;
    }

    public Blog author(Author author) {
        this.author = author;
        return this;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Blog blog = (Blog) o;
        if (blog.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), blog.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Blog{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", blogPost='" + getBlogPost() + "'" +
            ", date='" + getDate() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + imageContentType + "'" +
            "}";
    }
}
