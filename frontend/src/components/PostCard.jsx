import { usePosts } from '../context/PostsContext';
import { useAuth } from '../context/AuthContext';

export default function PostCard({ post, onOpenPost }) {
  const { toggleLike, toggleFavorite, isFavorite, getPostAuthor } = usePosts();
  const { user } = useAuth();
  const author = getPostAuthor(post.authorId);
  const saved = isFavorite(post.id);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <article className="post-card" onClick={() => onOpenPost && onOpenPost(post.id)}>
      <div className="post-card-image">
        <img src={post.coverImage} alt={post.title} loading="lazy" />
        <div className="post-card-tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="post-card-body">
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>

        <div className="post-card-meta">
          <div className="post-card-author">
            <img src={author?.avatar} alt={author?.displayName} className="avatar-sm" />
            <span className="post-card-author-name">{author?.displayName}</span>
          </div>
          <span className="post-card-date">{formatDate(post.createdAt)}</span>
        </div>

        <div className="post-card-actions">
          <button
            className={`action-btn ${post.liked ? 'liked' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
            title="Like"
          >
            <svg viewBox="0 0 24 24" fill={post.liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>{post.likes}</span>
          </button>

          <button
            className="action-btn"
            onClick={(e) => { e.stopPropagation(); onOpenPost && onOpenPost(post.id); }}
            title="Comments"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>{post.commentCount}</span>
          </button>

          <button
            className={`action-btn ${saved ? 'saved' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleFavorite(post.id); }}
            title={saved ? 'Remove from favorites' : 'Save to favorites'}
          >
            <svg viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
