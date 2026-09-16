"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import { signIn } from "@/app/admin/actions";
import { inputClass, labelClass } from "./ui";

export default function LoginForm() {
  const [state, action, pending] = useActionState(signIn, {});

  // Submit without React's automatic form reset, so a failed attempt keeps the email.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => action(fd));
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="login-email" className={labelClass}>
          Email
        </label>
        <input id="login-email" name="email" type="email" autoComplete="email" required className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="login-password" className={labelClass}>
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>
      {state.error ? (
        <p role="alert" className="rounded-xl bg-spark/10 px-4 py-3 text-[13px] font-semibold text-spark-deep">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-ink px-6 py-3.5 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink-soft disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
