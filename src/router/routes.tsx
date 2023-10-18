import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import Exception from '@/components/Exception';
import AuthRoot from '@/layouts/AuthRoot';

// 路由配置
export default createBrowserRouter([
  {
    path: '/login',
    lazy: () => import('@/pages/login'),
  },
  {
    path: '/',
    element: <AuthRoot />,
    children: [
      {
        path: 'home',
        lazy: () => import('@/pages/home'),
      },
      {
        path: 'doc',
        lazy: () => import('@/pages/doc'),
      },
      {
        path: 'custom',
        lazy: () => import('@/pages/custom'),
      },
      {
        path: 'locale',
        lazy: () => import('@/pages/locale'),
      },
      {
        path: 'icon',
        lazy: () => import('@/pages/icon'),
      },
      {
        path: 'table/base',
        lazy: () => import('@/pages/table'),
      },
      {
        path: 'table/drag',
        lazy: () => import('@/pages/table/drag'),
      },
      {
        path: 'auth',
        lazy: () => import('@/pages/auth'),
      },
      {
        path: '*',
        action: () => {
          return redirect('/home');
        },
        element: <Exception type="404" title="404" description="Not Found" />,
      },
    ],
  },
  {
    path: '*',
    element: <Exception type="404" title="404" description="Not Found" />,
  },
]);
