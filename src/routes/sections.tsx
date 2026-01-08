import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { RequireAuth } from 'src/routes/hooks';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

export const DashboardPage = lazy(() => import('src/pages/dashboard/index'));
export const BookingPage = lazy(() => import('src/pages/bookings/index'));
export const BookingDetailPage = lazy(() => import('src/pages/booking-detail/index'));
export const ItemPage = lazy(() => import('src/pages/items/index'));
export const MajorPage = lazy(() => import('src/pages/majors/index'));
export const StudentPage = lazy(() => import('src/pages/students/index'));

export const LoginPage = lazy(() => import('src/pages/login/login'));
export const Page404 = lazy(() => import('src/pages/not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    element: (
      <RequireAuth>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </RequireAuth>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'bookings', element: <BookingPage /> },
      { path: 'bookings/:id', element: <BookingDetailPage /> },
      { path: 'items', element: <ItemPage /> },
      { path: 'students', element: <StudentPage /> },
      { path: 'majors', element: <MajorPage /> },
    ],
  },
  {
    path: 'login',
    element: (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
