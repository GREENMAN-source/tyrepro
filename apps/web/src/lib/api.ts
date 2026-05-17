const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("tyrepro_token") : null;
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message ?? "Request failed");
  }

  return response.json();
}
