import { createClient } from '@supabase/supabase-js';

// Removed the /rest/v1/ from the end of this URL
const supabaseUrl = 'https://vmbajbloslfycuenqebh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtYmFqYmxvc2xmeWN1ZW5xZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxODQyODcsImV4cCI6MjA5NTc2MDI4N30.dx-Xm9HaJJXQb-hGvvBZewgVyou07jV8Z4eY3oX0StM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);