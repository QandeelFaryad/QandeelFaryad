"use client";

import { startTransition, useActionState, type FormEvent, type ReactNode } from "react";
import type { ActionState } from "@/app/admin/actions";

/**
 * A form wired to a server action, with a pending state and inline result.
 * Submits via startTransition so React doesn't reset the fields afterwards.
 */
export default function ActionForm({
  action,
  children,
  submitLabel = "Save changes",
  className = "",
}: {
  action: (state: ActionState, fd: FormData) => Promise<ActionState>;
  children: ReactNode;
  submitLabel?: string;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => formAction(fd));
  };

  return (
    <form onSubmit={onSubmit} className={`flex flex-col gap-6 ${className}`}>
      {children}
      <div className="flex flex-wrap items-center gap-4 border-t border-line pt-5">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink-soft disabled:opacity-60"
        >
          {pending ? "Saving…" : submitLabel}
        </button>
        <p aria-live="polite" className="text-[13px] font-semibold">
          {!pending && state.error ? <span className="text-spark-deep">{state.error}</span> : null}
          {!pending && state.ok ? <span className="text-accent-deep">✓ {state.ok}</span> : null}
        </p>
      </div>
    </form>
  );
}
