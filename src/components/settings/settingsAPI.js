const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://xartso-server-xpr7.vercel.app"
    : "http://localhost:8080";

export async function createWebsiteInfo(payload) {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${BASE_URL}/settings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return response.json();
}
