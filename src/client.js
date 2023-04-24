import { createClient } from '@supabase/supabase-js';

const URL = 'https://qgmocelmnczkuungtwvy.supabase.co';
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnbW9jZWxtbmN6a3V1bmd0d3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE2NzYxMDIsImV4cCI6MTk5NzI1MjEwMn0.t2JSVobdt9UT8bM5W2BZOBbmM9wWVywx6bMn2GgxIE4"

export const supabase = createClient(URL, API_KEY); 