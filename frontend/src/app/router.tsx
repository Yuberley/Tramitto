import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AdminLayout } from '@/app/layouts/AdminLayout'
import { HelperLayout } from '@/app/layouts/HelperLayout'

import { AdminDashboardPage } from '@/features/admin/pages/AdminDashboardPage'
import { AdminUsersPage } from '@/features/admin/pages/AdminUsersPage'
import { AdminTasksPage } from '@/features/admin/pages/AdminTasksPage'
import { AdminPaymentsPage } from '@/features/admin/pages/AdminPaymentsPage'
import { AdminSettingsPage } from '@/features/admin/pages/AdminSettingsPage'

import { HelperDashboardPage } from '@/features/helper/pages/HelperDashboardPage'
import { HelperTasksPage } from '@/features/helper/pages/HelperTasksPage'
import { HelperEarningsPage } from '@/features/helper/pages/HelperEarningsPage'
import { HelperProfilePage } from '@/features/helper/pages/HelperProfilePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboardPage /> },
      { path: 'users', element: <AdminUsersPage /> },
      { path: 'tasks', element: <AdminTasksPage /> },
      { path: 'payments', element: <AdminPaymentsPage /> },
      { path: 'settings', element: <AdminSettingsPage /> },
    ],
  },
  {
    path: '/helper',
    element: <HelperLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <HelperDashboardPage /> },
      { path: 'tasks', element: <HelperTasksPage /> },
      { path: 'earnings', element: <HelperEarningsPage /> },
      { path: 'profile', element: <HelperProfilePage /> },
    ],
  },
])
