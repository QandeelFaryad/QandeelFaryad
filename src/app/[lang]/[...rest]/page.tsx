import { notFound } from "next/navigation";

/** Any path under a language that matches no page: show that language's 404. */
export default function CatchAll() {
  notFound();
}
