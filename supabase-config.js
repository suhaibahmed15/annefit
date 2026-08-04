// Public Supabase client config — used on public-facing pages (contact,
// checkout, quiz, gallery) so forms can write to the shared database.
// This uses the anon/publishable key only, which is safe to expose
// (Row Level Security policies on the database control what it can
// actually read/write — see supabase-schema.sql).
const SUPABASE_URL = "https://hqgxxaflmduofhcmanio.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZ3h4YWZsbWR1b2ZoY21hbmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NDc0NjcsImV4cCI6MjEwMTQyMzQ2N30.Dryx8ucZK6Ww1GF5tOa0NXhQVa7O1rO6iy-p-PawvUE";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);