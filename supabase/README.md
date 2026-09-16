# Supabase setup

The website saves form submissions, CVs and editable content in Supabase, and
`/admin` is the panel for managing them. Until these steps are done, the site
keeps working with its built-in content and `/admin` shows setup instructions.

## 1. Create the project
1. Sign up at https://supabase.com and create a project (London region suits a UK business).
2. Save the database password somewhere safe.

## 2. Create the tables
1. Open **SQL Editor → New query**.
2. Paste the whole of `schema.sql` and click **Run**.
3. Open another query, paste `seed.sql` and click **Run**. This copies the two existing case studies into the database.

## 3. Add the keys to the website
In **Project Settings → API Keys**, copy the values into `.env.local` in the project root
(and into your hosting provider's environment variables when you deploy):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
```

Older projects call these the `anon` and `service_role` keys; those work too.
Restart the site after changing them.

## 4. Create your admin login
1. In Supabase, open **Authentication → Users → Add user → Create new user**.
   Enter your email and a strong password, and tick **Auto Confirm User**.
2. In **SQL Editor**, run (with your email):

   ```sql
   insert into public.admins (user_id, email)
   select id, email from auth.users where email = 'you@qorliq.com';
   ```

3. Sign in at `/admin/login`.

Repeat step 4 for anyone else who needs access. To remove someone:
`delete from public.admins where email = 'them@example.com';`

## 5. Recommended security settings
- **Authentication → Sign In / Providers → Email:** turn off **Allow new users to sign up**.
  Admins are added by hand, so nobody else needs to create an account.
- Turn on **multi-factor authentication** for your Supabase account itself.

## What goes where
| Website | Table / bucket |
|---|---|
| Contact form | `inquiries` |
| Careers applications | `applications`, CV files in the private `cvs` bucket |
| Newsletter sign-ups | `subscribers` |
| Journal posts | `posts` |
| Job openings | `roles` |
| Case studies | `case_studies`, images in the public `media` bucket |
| "Company at a glance" numbers | `settings` |
