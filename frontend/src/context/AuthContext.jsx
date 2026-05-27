import { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('devchronicles_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('devchronicles_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('devchronicles_user');
    }
  }, [user]);

  const login = (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = users.find(u => u.email === email);
        if (found) {
          setUser(found);
          setLoading(false);
          resolve(found);
        } else {
          // For demo: accept any email with password "password"
          if (password === 'password') {
            const demoUser = {
              id: Date.now(),
              username: email.split('@')[0],
              displayName: email.split('@')[0],
              email,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
              bio: 'New DevChronicles member',
              joinedDate: new Date().toISOString(),
            };
            setUser(demoUser);
            setLoading(false);
            resolve(demoUser);
          } else {
            setLoading(false);
            reject(new Error('Invalid email or password'));
          }
        }
      }, 600);
    });
  };

  const signup = (displayName, email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = users.find(u => u.email === email);
        if (exists) {
          setLoading(false);
          reject(new Error('An account with this email already exists'));
        } else {
          const newUser = {
            id: Date.now(),
            username: email.split('@')[0],
            displayName,
            email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            bio: 'New DevChronicles member',
            joinedDate: new Date().toISOString(),
          };
          setUser(newUser);
          setLoading(false);
          resolve(newUser);
        }
      }, 600);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
