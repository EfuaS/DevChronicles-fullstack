import { createContext, useContext, useState, useCallback } from 'react';
import { posts as seedPosts } from '../data';
import { comments as seedComments } from '../data';
import { users } from '../data';

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(seedPosts);
  const [comments, setComments] = useState(seedComments);
  const [favorites, setFavorites] = useState([]);

  const toggleLike = useCallback((postId) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === postId ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p
      )
    );
  }, []);

  const addComment = useCallback((postId, content, user) => {
    const newComment = {
      id: Date.now(),
      postId,
      authorId: user.id,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setComments(prev => [newComment, ...prev]);
    setPosts(prev =>
      prev.map(p =>
        p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p
      )
    );
  }, []);

  const toggleFavorite = useCallback((postId) => {
    setFavorites(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  }, []);

  const isFavorite = useCallback((postId) => {
    return favorites.includes(postId);
  }, [favorites]);

  const getPostComments = useCallback((postId) => {
    return comments
      .filter(c => c.postId === postId)
      .map(c => ({
        ...c,
        author: users.find(u => u.id === c.authorId),
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [comments]);

  const getPostAuthor = useCallback((authorId) => {
    return users.find(u => u.id === authorId);
  }, []);

  const getFavoritePosts = useCallback(() => {
    return posts.filter(p => favorites.includes(p.id));
  }, [posts, favorites]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        comments,
        favorites,
        toggleLike,
        addComment,
        toggleFavorite,
        isFavorite,
        getPostComments,
        getPostAuthor,
        getFavoritePosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
}
