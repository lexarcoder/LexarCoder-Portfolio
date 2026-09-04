// services/chatService.js
//
// ⚠️ IMPORTANT: The endpoint paths and response shapes below are ASSUMPTIONS
// because your backend routes/controllers/models haven't been shared yet.
// Once you paste your Chat Model / Chat Routes / Chat Controller, I will
// adjust these to match your EXACT existing API — nothing here should be
// treated as final.
//
// Auth assumption: cookie/session based (credentials: "include").
// If you actually use a JWT (e.g. stored via useAuth()), tell me and I'll
// switch this to send `Authorization: Bearer <token>` instead.

const API_BASE = process.env.REACT_APP_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include", // change to Authorization header if you use JWT
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      message = data.message || message;
    } catch (_) {}
    throw new Error(message);
  }

  // No content
  if (res.status === 204) return null;
  return res.json();
}

/**
 * Fetch the logged-in user's chat list (sidebar history).
 * Assumed: GET /api/chats -> { chats: [{ _id, title, updatedAt }] }
 */
export function getChats() {
  return request("/chats", { method: "GET" });
}

/**
 * Fetch messages for a single chat.
 * Assumed: GET /api/chats/:chatId/messages -> { messages: [{ _id, role, content, createdAt }] }
 */
export function getChatMessages(chatId) {
  return request(`/chats/${chatId}/messages`, { method: "GET" });
}

/**
 * Send a message. If chatId is null, backend should create a new chat.
 * Assumed: POST /api/chats/message
 *   body: { chatId, message }
 *   response: { chatId, title, userMessage, aiMessage }
 */
export function sendMessage({ chatId, message }) {
  return request("/chats/message", {
    method: "POST",
    body: JSON.stringify({ chatId, message }),
  });
}

/**
 * Optional: delete a chat.
 * Assumed: DELETE /api/chats/:chatId
 */
export function deleteChat(chatId) {
  return request(`/chats/${chatId}`, { method: "DELETE" });
}
