import { POST } from "../fetchwrapper";

const API_BASE = "http://localhost:5000/auth";

export async function signup(userData) {
  try {
    const res = await POST(`${API_BASE}/signup`, userData);

    if (!res.success) {
      throw new Error(res.error || res.message || "Signup failed");
    }
    return res;
  } catch (err) {
    console.error("Signup error:", err);
    throw new Error(err.message || "Unable to signup");
  }
}





export async function login(userData) {
  try {
    const res = await POST(`${API_BASE}/login`, userData, true);

    if (!res.success || !res.user || !res.token) {
      throw new Error(
       (res.error || res.message || "Login failed")
      );
    }
    return res;
  } catch (err) {
    console.error("Login error:", err);

    throw new Error(err.message || "Unable to login. Please try again.");
  }
}
