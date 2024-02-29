import { createContext, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types';

export type SupabaseContextValue = {
  supabase: ReturnType<typeof createClient<Database>>;
};

export const SupabaseContext = createContext<SupabaseContextValue | null>(null);
SupabaseContext.displayName = 'SupabaseContext';

export const SupabaseProvider = ({
  children,
  supabaseKey,
}: {
  children: React.ReactNode;
  supabaseKey: string;
}) => {
  const supabaseUrl = 'https://tmeoawlhihzuoqxebciw.supabase.co';
  const supabase = createClient<Database>(supabaseUrl, supabaseKey);

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabaseContext = () => {
  const context = useContext(SupabaseContext);

  if (context === null) {
    throw new Error(
      'useSupabaseContext must be used within a <SupabaseProvider />'
    );
  }
  return context;
};
