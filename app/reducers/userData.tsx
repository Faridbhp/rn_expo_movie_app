// store/userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. Define data model
export interface UserData {
    phoneNumber: string;
    name: string;
    email: string;
    uid: string;
    // Tambahkan properti lain jika diperlukan
}

// 2. Define initial state
interface UserState {
    userData: UserData | null;
}

const initialState: UserState = {
    userData: null,
};

// 3. Create slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserData | null>) => { // Perubahan: Aksi bisa menerima null
      state.userData = action.payload;
    },
        clearUserData: (state) => {
            state.userData = null;
        },
    },
});

// 4. Export actions and reducer
export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
