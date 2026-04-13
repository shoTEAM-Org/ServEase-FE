
  # FE_Web(Provider)

  This is a code bundle for FE_Web(Provider). The original project is available at https://www.figma.com/design/NjHaqneACA1gTlpAe8leya/FE_Web-Provider-.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Supabase Integration

  The provider frontend now uses `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` from `.env.local` through
  [`src/supabaseClient.ts`](./src/supabaseClient.ts).

  Auth and session helpers live in [`src/lib/supabase/auth.ts`](./src/lib/supabase/auth.ts).
  CRUD helpers for provider profiles and bookings live in
  [`src/lib/supabase/api.ts`](./src/lib/supabase/api.ts).

  For backend access:

  - Enable the allowed frontend origin in your Supabase project settings if you are calling Edge Functions or custom endpoints from the browser.
  - Table queries made with the Supabase client automatically use the signed-in session.
  - For custom `fetch` calls that need a bearer token, use `fetchWithSupabaseAuth(...)`.
  - If your Supabase tables use different names, set `NEXT_PUBLIC_SUPABASE_PROVIDER_PROFILES_TABLE`, `NEXT_PUBLIC_SUPABASE_BOOKINGS_TABLE`, or `NEXT_PUBLIC_SUPABASE_PROVIDER_USER_ID_COLUMN` in `.env.local`.

  ## Backend API Integration

  The provider frontend can also run against the Nest gateway backend.

  Add this to `.env.local` when using backend APIs:

  ```env
  NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
  ```

  Integration details live in [`API_INTEGRATION.md`](./API_INTEGRATION.md).
  
