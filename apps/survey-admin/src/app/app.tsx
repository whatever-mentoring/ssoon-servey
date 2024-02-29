import { useSupabaseContext } from '@ssoon-servey/supabase';

export function App() {
  const { supabase } = useSupabaseContext();
  console.log('supabase', supabase);
  return <div>Admin!!</div>;
}

export default App;
