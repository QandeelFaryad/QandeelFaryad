"use client";

import type { ReactNode } from "react";

/** A submit button that asks before running a destructive server action. */
export default function ConfirmSubmit({
  action,
  id,
  message,
  children,
  className = "",
}: {
  action: (fd: FormData) => Promise<void>;
  id: string;
  message: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className={
          className ||
          "rounded-full border border-spark/30 px-4 py-2 text-[12px] font-bold uppercase tracking-wide text-spark-deep transition-colors hover:bg-spark/10"
        }
      >
        {children}
      </button>
    </form>
  );
}
