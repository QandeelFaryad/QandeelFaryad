"use client";

import { useId, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { inputClass, labelClass } from "./ui";

const MAX_MB = 8;

/**
 * Image picker for posts and case studies: uploads straight to the public
 * "media" bucket in Supabase, or accepts a pasted URL / site path.
 */
export default function ImageField({
  name,
  label,
  defaultValue,
  folder,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  folder: string;
}) {
  const id = useId();
  const [value, setValue] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const file = useRef<HTMLInputElement | null>(null);

  const upload = async (f: File) => {
    setError("");
    if (!f.type.startsWith("image/")) return setError("Choose an image file (JPG, PNG, WebP or AVIF).");
    if (f.size > MAX_MB * 1024 * 1024) return setError(`Images must be under ${MAX_MB}MB.`);
    setBusy(true);
    try {
      const ext = (f.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const supabase = createClient();
      const { error: upErr } = await supabase.storage.from("media").upload(path, f, { contentType: f.type });
      if (upErr) throw upErr;
      setValue(supabase.storage.from("media").getPublicUrl(path).data.publicUrl);
    } catch (err) {
      setError((err as Error).message || "Upload failed.");
    } finally {
      setBusy(false);
      if (file.current) file.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex h-[120px] w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-line bg-cloud sm:w-[180px]">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-[12px] text-muted">No image</span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <input
            id={id}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://… or /assets/…"
            className={inputClass}
          />
          <div className="flex flex-wrap items-center gap-3">
            <label className="cursor-pointer rounded-full border border-line bg-white px-4 py-2 text-[12px] font-bold uppercase tracking-wide text-ink hover:border-ink/30">
              {busy ? "Uploading…" : "Upload image"}
              <input
                ref={file}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                className="sr-only"
                disabled={busy}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) upload(f);
                }}
              />
            </label>
            {value ? (
              <button type="button" onClick={() => setValue("")} className="text-[12px] font-semibold text-muted hover:text-ink">
                Remove
              </button>
            ) : null}
          </div>
          {error ? <p className="text-[12px] font-semibold text-spark-deep">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
