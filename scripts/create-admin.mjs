#!/usr/bin/env node
/**
 * Creates (or updates) a Supabase login and gives it access to /admin.
 *
 *   npm run create-admin -- you@example.com
 *
 * You'll be asked for the password (it isn't echoed or saved in shell history).
 * Re-running for an existing email resets its password and keeps it an admin.
 * Reads NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY from .env.local.
 */
import fs from "node:fs";
import readline from "node:readline";
import { createClient } from "@supabase/supabase-js";

const MIN_LENGTH = 8;
const RECOMMENDED_LENGTH = 12;

function loadEnv(file) {
  if (!fs.existsSync(file)) return {};
  return Object.fromEntries(
    fs
      .readFileSync(file, "utf8")
      .split("\n")
      .filter((l) => /^[A-Z0-9_]+=/.test(l))
      .map((l) => {
        const i = l.indexOf("=");
        return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
      }),
  );
}

function askHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (s) => rl.output.write(s.startsWith(question) ? s : "");
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
  });
}

const env = { ...loadEnv(".env.local"), ...process.env };
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const secret = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !secret) {
  console.error("✘ Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local first.");
  process.exit(1);
}

const email = (process.argv[2] ?? "").trim().toLowerCase();
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error("Usage: npm run create-admin -- you@example.com");
  process.exit(1);
}

const password = process.env.ADMIN_PASSWORD ?? (await askHidden(`Password for ${email}: `));
if (password.length < MIN_LENGTH) {
  console.error(`✘ Use at least ${MIN_LENGTH} characters — /admin holds your leads and applicants' CVs.`);
  process.exit(1);
}
if (password.length < RECOMMENDED_LENGTH || /^(admin|password|qorliq)/i.test(password)) {
  console.warn("⚠ This password is easy to guess. Consider a longer, random one (re-run this script to change it).");
}
if (!process.env.ADMIN_PASSWORD && (await askHidden("Type it again: ")) !== password) {
  console.error("✘ The passwords didn't match.");
  process.exit(1);
}

const supabase = createClient(url, secret, { auth: { persistSession: false, autoRefreshToken: false } });

// Find an existing login with this email, if any.
let user = null;
for (let page = 1; !user; page++) {
  const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
  if (error) {
    console.error("✘ Couldn't read users:", error.message);
    process.exit(1);
  }
  user = data.users.find((u) => u.email?.toLowerCase() === email) ?? null;
  if (data.users.length < 1000) break;
}

if (user) {
  const { error } = await supabase.auth.admin.updateUserById(user.id, { password, email_confirm: true });
  if (error) {
    console.error("✘ Couldn't update the password:", error.message);
    process.exit(1);
  }
  console.log(`✔ Updated the password for ${email}`);
} else {
  const { data, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true });
  if (error) {
    console.error("✘ Couldn't create the login:", error.message);
    process.exit(1);
  }
  user = data.user;
  console.log(`✔ Created the login ${email}`);
}

const { error: adminError } = await supabase
  .from("admins")
  .upsert({ user_id: user.id, email }, { onConflict: "user_id" });
if (adminError) {
  console.error("✘ Couldn't grant admin access:", adminError.message, "(has supabase/schema.sql been run?)");
  process.exit(1);
}
console.log(`✔ ${email} is an admin — sign in at /admin/login`);
