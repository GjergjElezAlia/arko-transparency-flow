const KEY = "arko_auditor_session";

export function login(email: string, password: string): boolean {
  if (email && password.length >= 4) {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEY, JSON.stringify({ email, ts: Date.now() }));
    }
    return true;
  }
  return false;
}

export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

export function getSession(): { email: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}