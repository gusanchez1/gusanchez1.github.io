import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Fontes servidas pelo próprio site (sem depender do Google Fonts)
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import '@fontsource-variable/jetbrains-mono/wght.css';
import './styles/global.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
