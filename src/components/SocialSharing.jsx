import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import '../styles/SocialSharing.css';

function SocialSharing({ book }) {
  const shareUrl = `https://yourwebsite.com/book/${book.id}`;
  const shareText = `Check out "${book.title}" on BookVerse!`;

  const shareOnSocial = (platform) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <div className="social-sharing">
      <button onClick={() => shareOnSocial('twitter')}>
        <FaTwitter /> Share on Twitter
      </button>
      <button onClick={() => shareOnSocial('facebook')}>
        <FaFacebook /> Share on Facebook
      </button>
      <button onClick={() => shareOnSocial('linkedin')}>
        <FaLinkedin /> Share on LinkedIn
      </button>
    </div>
  );
}

export default SocialSharing;
