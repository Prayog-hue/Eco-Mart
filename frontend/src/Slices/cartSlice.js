import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//helper function to load cart from local storage

export const loadCartFromStorage = () => {
  try {
    const storedcart = localStorage.getItem("cart");
    return storedcart ? JSON.parse(storedcart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage", error);
    return [];
  }
};


//helper funn to save cart back to local storage
export const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage", error);
  }
};


// Fetch cart by user ID or guest ID
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
        {
            params:{userId , guestId}
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
  }
);

//Add an  item to the cart for a user or guest
// Add item to cart for logged-in user or guest
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity,size , color , userId, guestId }, { rejectWithValue }) => {
    try {

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
        { productId, quantity, size, color, guestId, userId }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add to cart");
    }
  }
);

//update the qty of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, Quantity, userId, guestId, size, color }, { rejectWithValue }) => {
    try {

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/${idToUse}/item/`,
        { productId, Quantity, userId, guestId, size, color }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update cart item");
    }
  }
);

//Remove an item from the cart

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ productId, userId, guestId, size, color }, { rejectWithValue }) => {
    try {

      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/${idToUse}/item/cart`,
        { productId, userId, guestId, size, color}
      );

      return response.data; // Ideally updated cart or message
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove cart item");
    }
}
);

//Merge guest cart into user cart

export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        {
          guestId,
          user,
        },
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`

            }
        }
      );

      return response.data; // Ideally returns updated user cart
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to merge guest cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = {products:[]};
     localStorage.removeItem("cart")   
 },
  },
  extraReducers: (builder) => {
    builder
      // FETCH CART
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        saveCartToStorage(state.items);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ADD TO CART
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
        saveCartToStorage(state.items);
      })

      // UPDATE CART ITEM
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.items = action.payload;
        saveCartToStorage(state.items);
      })

      // REMOVE CART ITEM
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
        saveCartToStorage(state.items);
      })

      // MERGE GUEST CART
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.items = action.payload;
        saveCartToStorage(state.items);
      });
  },
});
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
