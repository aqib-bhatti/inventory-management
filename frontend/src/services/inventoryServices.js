import { GET, POST, PUT, DELETE } from "../fetchwrapper";

const API_BASE = "http://localhost:5000/inventory";

// Add new inventory item
export async function addInventory(userData) {
  try {
    const res = await POST(`${API_BASE}/addInventory`, userData);

    if (!res || res.status < 200 || res.status >= 300) {
      throw new Error(res.error || "Failed to add inventory");
    }

    return res;
  } catch (err) {
    console.error("Add Inventory error:", err);
    throw new Error(
      err.message || "Unable to add inventory. Please try again."
    );
  }
}

// Get all inventory items
export async function getInventory() {
  try {
    const res = await GET(`${API_BASE}/getAllInventory`);

    if (!res || res.status < 200 || res.status >= 300) {
      throw new Error(res.error || "Failed to fetch inventory");
    }

    return res;
  } catch (err) {
    console.error("Get Inventory error:", err);
    throw new Error(
      err.message || "Unable to fetch inventory. Please try again."
    );
  }
}
// Update inventory item by ID
export async function updateInventory(id, data) {
  try {
    const res = await PUT(`${API_BASE}/updateInventory/${id}`, data);

    if (!res || res.status < 200 || res.status >= 300) {
      throw new Error(res.error || "Failed to update inventory");
    }

    return res;
  } catch (err) {
    console.error("Update Inventory error:", err);
    throw new Error(
      err.message || "Unable to update inventory. Please try again."
    );
  }
}

// Delete inventory item by ID
export async function deleteInventory(id) {
  try {
    const res = await DELETE(`${API_BASE}/deleteItem/${id}`);
    if (!res || res.error) {
      throw new Error(res?.error || "Failed to delete inventory");
    }
    return { id, message: res.message };
  } catch (err) {
    console.error("Delete Inventory error:", err);
    throw new Error(
      err.message || "Unable to delete inventory. Please try again."
    );
  }
}
