import { useState } from 'react';
import { usePosts } from '../context/PostsContext';
import { useAuth } from '../context/AuthContext';

export default function PostDetail({ post, onBack }) {
  const { toggleLike, toggleFavorite, isFavorite, getPostComments, getPostAuthor, addComment } = usePosts();
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');

  const author = getPostAuthor(post.authorId);
  const comments = getPostComments(post.id);
  const saved = isFavorite(post.id);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText.trim(), user);
    setCommentText('');
  };

  return (
    <div className="post-detail">
      <button className="btn btn-back" onClick={onBack}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Feed
      </button>

      <article className="post-detail-article">
        <div className="post-detail-cover">
          <img src={post.coverImage} alt={post.title} />
        </div>

        <div className="post-detail-header">
          <div className="post-detail-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <h1 className="post-detail-title">{post.title}</h1>

          <div className="post-detail-meta">
            <div className="post-card-author">
              <img src={author?.avatar} alt={author?.displayName} className="avatar-sm" />
              <div>
                <span className="post-card-author-name">{author?.displayName}</span>
                <span className="post-card-date">{formatDate(post.createdAt)}</span>
              </div>
            </div>

            <div className="post-detail-actions">
              <button
                className={`action-btn ${post.liked ? 'liked' : ''}`}
                onClick={() => toggleLike(post.id)}
              >
                <svg viewBox="0 0 24 24" fill={post.liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span>{post.likes}</span>
              </button>
              <button
                className={`action-btn ${saved ? 'saved' : ''}`}
                onClick={() => toggleFavorite(post.id)}
              >
                <svg viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <span>{saved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="post-detail-content">
          {post.content.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>

      <section className="comments-section">
        <h3 className="comments-title">
          Comments ({comments.length})
        </h3>

        <form className="comment-form" onSubmit={handleSubmitComment}>
          <div className="comment-form-row">
            <img src={user?.avatar} alt={user?.displayName} className="avatar-sm" />
            <input
              type="text"
              className="comment-input"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm" disabled={!commentText.trim()}>
              Post
            </button>
          </div>
        </form>

        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <img src={comment.author?.avatar} alt={comment.author?.displayName} className="avatar-sm" />
              <div className="comment-body">
                <div className="comment-header">
                  <span className="comment-author">{comment.author?.displayName}</span>
                  <span className="comment-date">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="comment-text">{comment.content}</p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="no-comments">No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </section>
    </div>
  );
}
