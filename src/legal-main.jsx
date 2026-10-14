import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LegalPage } from './components/Legal.jsx';
import './styles.css';

const page = window.location.pathname.split('/').filter(Boolean).at(-1) ?? 'support';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LegalPage page={page} />
  </StrictMode>,
);
