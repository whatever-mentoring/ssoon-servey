import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SupabaseProvider } from '@ssoon-servey/supabase';
import App from './app/app';
import '@ssoon-servey/shared-ui/css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <SupabaseProvider supabaseKey={import.meta.env.VITE_SUPABASE_KEY}>
        <App />
      </SupabaseProvider>
    </BrowserRouter>
  </StrictMode>
);
