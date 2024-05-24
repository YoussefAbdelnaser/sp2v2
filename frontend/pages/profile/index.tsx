// pages/profile/index.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../authContext'; // Adjust the import path based on your project structure

const ProfileIndex: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const {
    state: { isLoggedIn },
  } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setEmail(user.email);
      }
    }
  }, [isLoggedIn]);

  const navigateToProfile = () => {
    if (email) {
      router.push(`/profile/${email}`);
    } else {
      console.error('User email is not available');
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <button onClick={navigateToProfile}>Go to My Profile</button>
    </div>
  );
};

export default ProfileIndex;
