const BASE_URL = "http://localhost:8080";
export async function createWebsiteInfo(payload) {
  const response = await fetch(`${BASE_URL}/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return response.json();
}
