import { useState } from 'react';
import { usePosts } from '../context/PostsContext';
import PostCard from '../components/PostCard';
import PostDetail from '../components/PostDetail';

export default function Favorites() {
  const { getFavoritePosts } = usePosts();
  const [selectedPostId, setSelectedPostId] = useState(null);

  const favPosts = getFavoritePosts();

  const handleOpenPost = (postId) => {
    setSelectedPostId(postId);
  };

  const handleClosePost = () => {
    setSelectedPostId(null);
  };

  if (selectedPostId) {
    const post = favPosts.find(p => p.id === selectedPostId);
    if (post) return <PostDetail post={post} onBack={handleClosePost} />;
    setSelectedPostId(null);
  }

  return (
    <div className="feed-page">
      <div className="feed-header">
        <div>
          <h2 className="page-title">Favorites</h2>
          <p className="page-subtitle">Posts you've saved for later</p>
        </div>
      </div>

      {favPosts.length > 0 ? (
        <div className="posts-grid">
          {favPosts.map(post => (
            <PostCard key={post.id} post={post} onOpenPost={handleOpenPost} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <h3>No favorites yet</h3>
          <p>Save posts from your feed to find them here later</p>
        </div>
      )}
    </div>
  );
}
