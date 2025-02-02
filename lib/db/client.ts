import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    "https://bojsdyqeykaldxxkuomp.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvanNkeXFleWthbGR4eGt1b21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNDg4NTAsImV4cCI6MjA0NDgyNDg1MH0.npiGWSm8aKSzALz5FA7qKgVVk9Rgih9sw8s-Im0YFiU"
  );
