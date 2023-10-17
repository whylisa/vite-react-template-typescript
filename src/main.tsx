import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import App from './App';
import './i18n';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <I18nProvider i18n={i18n}>
    <App />
  </I18nProvider>,
);
