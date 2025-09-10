import { GET, DELETE } from '../fetchwrapper';

const API_BASE = 'http://localhost:5000/user';

export async function getProfile() {
  try {
    const res = await GET(`${API_BASE}/getprofile`);

    if (!res || res.status < 200 || res.status >= 300) {
      throw new Error(res.error || 'Failed to fetch profile');
    }

    return res;
  } catch (err) {
    console.error('Get Profile error:', err);
    throw new Error(err.message || 'Unable to fetch profile');
  }
}

export async function getAllUsers() {
  try {
    const res = await GET(`${API_BASE}/allusers`);

    if (!res || res.status < 200 || res.status >= 300) {
      throw new Error(res.error || 'Failed to fetch users');
    }

    return res;
  } catch (err) {
    console.error('Get All Users error:', err);
    throw new Error(err.message || 'Unable to fetch users');
  }
}

export async function deleteUser(userId) {
  try {
    const res = await DELETE(`${API_BASE}/deleteUser/${userId}`);
    if (!res || res.status < 200 || res.status >= 300) {
      throw new Error(res.error || 'Failed to delete user');
    }
    return res;
  } catch (err) {
    console.error('Delete User error:', err);
    throw new Error(err.message || 'Unable to delete user');
  }
}
