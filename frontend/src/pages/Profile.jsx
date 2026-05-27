import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="profile-page">
      <div className="feed-header">
        <div>
          <h2 className="page-title">Profile</h2>
          <p className="page-subtitle">Your account information</p>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-card-header">
          <img src={user?.avatar} alt={user?.displayName} className="profile-avatar" />
          <div className="profile-info">
            <h3 className="profile-name">{user?.displayName}</h3>
            <span className="profile-username">@{user?.username}</span>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-detail-row">
            <span className="profile-detail-label">Email</span>
            <span className="profile-detail-value">{user?.email}</span>
          </div>
          <div className="profile-detail-row">
            <span className="profile-detail-label">Bio</span>
            <span className="profile-detail-value">{user?.bio || 'No bio yet'}</span>
          </div>
          <div className="profile-detail-row">
            <span className="profile-detail-label">Joined</span>
            <span className="profile-detail-value">{formatDate(user?.joinedDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
