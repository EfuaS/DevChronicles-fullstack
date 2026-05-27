import { useState, useMemo } from 'react';
import { usePosts } from '../context/PostsContext';
import PostCard from '../components/PostCard';
import PostDetail from '../components/PostDetail';

const POSTS_PER_PAGE = 4;

export default function Feed() {
  const { posts } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return posts;
    return posts.filter(
      p =>
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
    );
  }, [posts, searchQuery]);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [filteredPosts]);

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleOpenPost = (postId) => {
    setSelectedPostId(postId);
  };

  const handleClosePost = () => {
    setSelectedPostId(null);
  };

  if (selectedPostId) {
    const post = posts.find(p => p.id === selectedPostId);
    return <PostDetail post={post} onBack={handleClosePost} />;
  }

  return (
    <div className="feed-page">
      <div className="feed-header">
        <div>
          <h2 className="page-title">Your Feed</h2>
          <p className="page-subtitle">Discover the latest from the dev community</p>
        </div>
      </div>

      <div className="search-bar">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search posts by title, content, or tag..."
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery && (
          <button className="search-clear" onClick={() => { setSearchQuery(''); setCurrentPage(1); }}>
            ✕
          </button>
        )}
      </div>

      {searchQuery && (
        <p className="search-results-count">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} found
        </p>
      )}

      {paginatedPosts.length > 0 ? (
        <div className="posts-grid">
          {paginatedPosts.map(post => (
            <PostCard key={post.id} post={post} onOpenPost={handleOpenPost} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <h3>No posts found</h3>
          <p>Try adjusting your search query</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn btn-pagination"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            ← Previous
          </button>

          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`btn btn-page ${page === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="btn btn-pagination"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
