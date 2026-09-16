export const INQUIRY_STATUSES = ["new", "contacted", "won", "lost", "archived"];
export const APPLICATION_STATUSES = ["new", "reviewing", "interview", "hired", "rejected"];
export const POST_STATUSES = ["draft", "published"];
export const ROLE_STATUSES = ["draft", "open", "closed"];

export const label = (s: string) => s[0].toUpperCase() + s.slice(1);
