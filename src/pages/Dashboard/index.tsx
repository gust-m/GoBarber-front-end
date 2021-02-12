import React from 'react';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <button type="submit" onClick={signOut}>
      Click here
    </button>
  );
};

export default Dashboard;
