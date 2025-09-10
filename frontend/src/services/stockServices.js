import { GET, POST } from '../fetchwrapper';

const API_BASE = 'http://localhost:5000/stock';

export async function getSummery(userData) {
  try {
    const res = await GET(`${API_BASE}/summery`, userData);
    if (!res || res.status < 200 || res.status >= 300) {
      throw new Error(res.error || 'Failed to fetch summary');
    }
    return res;
  } catch (err) {
    console.error('Get Summary error:', err);
    throw new Error(err.message || 'Unable to fetch summary');
  }
}

export async function getReports(type) {
  try {
    const res = await GET(`${API_BASE}/reports?type=${type}`);
    if (!res || res.status < 200 || res.status >= 300) {
      throw new Error(res.error || 'Failed to fetch reports');
    }
    return res;
  } catch (err) {
    console.error('Get Reports error:', err);
    throw new Error(err.message || 'Unable to fetch reports');
  }
}

export async function makeSale(data) {
  try {
    const res = await POST(`${API_BASE}/out`, data, true);
    if (!res || res.status < 200 || res.status >= 300) {
      throw new Error(res.error || 'Failed to make sale');
    }
    return res;
  } catch (err) {
    console.error('Make Sale error:', err);
    throw new Error(err.message || 'Unable to make sale');
  }
}

export async function salesmanLogs(type) {
  try {
    const res = await GET(`${API_BASE}/logs?type=${type}`);
    if (!res || res.status < 200 || res.status >= 300) {
      throw new Error(res.error || 'Failed to fetch salesman logs');
    }
    return res;
  } catch (err) {
    console.error('Salesman Logs error:', err);
    throw new Error(err.message || 'Unable to fetch salesman logs');
  }
}

//
