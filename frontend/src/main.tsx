import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Routes from './routes';
import './_index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
