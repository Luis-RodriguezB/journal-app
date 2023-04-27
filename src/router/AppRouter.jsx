import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth';
import { JournalRoutes } from '../journal';
import { authStatus } from '../store/auth/authSlice';
import { CheckingAuth } from '../ui';
import { useCheckAuth } from '../hooks';

export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === authStatus.checking) {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === authStatus.authenticated ? (
        <Route path='/*' element={<JournalRoutes />} />
      ) : (
        <Route path='/auth/*' element={<AuthRoutes />} />
      )}

      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};
