import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaUser, FaUserPlus, FaEdit, FaBars } from 'react-icons/fa';
import { useProfile } from '../context/ProfileContext';
import '../styles/Navbar.css';

function Navbar() {
  const { profile, updateProfile } = useProfile();
  const [showModal, setShowModal] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(tempProfile);
    setShowModal(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <FaBook className="logo-icon" />
          <h1>BookVerse</h1>
        </Link>
        <div className="profile-quick-view">
          <span>{profile.name}</span>
          <button className="edit-profile" onClick={() => setShowModal(true)}>
            <FaEdit />
          </button>
        </div>
      </div>

      <button 
        className="mobile-menu-btn"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <FaBars />
      </button>

      <div className={`nav-right ${showMobileMenu ? 'active' : ''}`}>
        <Link to="/login" className="auth-button login">
          <FaUser /> Login
        </Link>
        <Link to="/signup" className="auth-button signup">
          <FaUserPlus /> Sign Up
        </Link>
      </div>

      {showModal && (
        <div className="profile-modal">
          <div className="modal-content">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({
                    ...tempProfile,
                    name: e.target.value
                  })}
                />
              </div>
              <div className="form-group">
                <label>Interests (comma-separated)</label>
                <input
                  type="text"
                  value={tempProfile.interests.join(', ')}
                  onChange={(e) => setTempProfile({
                    ...tempProfile,
                    interests: e.target.value.split(',').map(i => i.trim())
                  })}
                />
              </div>
              <div className="modal-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
