

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} from "../services/inventoryServices";

// Fetch all inventory
export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async () => {
    const res = await getInventory();
    return res.items;
  }
);

// Add inventory item
export const addInventoryItem = createAsyncThunk(
  "inventory/addInventoryItem",
  async (inventoryData, { dispatch }) => {
    const res = await addInventory(inventoryData);
    dispatch(fetchInventory());
    return res;
  }
);

// Update inventory item
export const updateInventoryItem = createAsyncThunk(
  "inventory/updateInventoryItem",
  async ({ id, ...data }, { dispatch }) => {
    const res = await updateInventory(id, data);
    dispatch(fetchInventory());
    return res;
  }
);

// Delete inventory item
export const deleteInventoryItem = createAsyncThunk(
  "inventory/deleteInventoryItem",
  async (id, { dispatch }) => {
    const res = await deleteInventory(id);
    dispatch(fetchInventory());
    return res;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    items: [],
    loading: false,
    message: "",
    error: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Add
      .addCase(addInventoryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addInventoryItem.fulfilled, (state) => {
        state.message = "Item added successfully";
        state.loading = false;
      })
      .addCase(addInventoryItem.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Update
      .addCase(updateInventoryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInventoryItem.fulfilled, (state) => {
        state.message = "Item updated successfully";
        state.loading = false;
      })
      .addCase(updateInventoryItem.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Delete
      .addCase(deleteInventoryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInventoryItem.fulfilled, (state, action) => {
        // state.items me se delete item remove karo
        state.items = state.items.filter(
          (item) => item._id !== action.payload.id
        );
        state.message = action.payload.message || "Item deleted successfully";
        state.loading = false;
      })

      .addCase(deleteInventoryItem.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { clearMessage } = inventorySlice.actions;
export default inventorySlice.reducer;
