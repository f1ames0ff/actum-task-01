import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppApi } from "../../api/api";
import { UserSearchResult } from "../../types/user-search-result.interface";
import { UserSearchPayload } from "../../types/search-user-payload.interface";
import { User } from "../../types/user.interface";
import { AxiosResponse } from "axios";
import { memCache } from "../mem-cache";
import { ITEMS_PER_PAGE } from "../../contants";

export const searchSlice = createSlice({
  name: 'search',

  initialState: {
    searchString: '',
    items: [] as User[],
    total: 0
  },

  reducers: {
    search(state, action: PayloadAction<User[]>) {
      state.items = action.payload ?? [];
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload ?? 0;
    },
  }
});

// Action destructuring
const { search, setTotal } = searchSlice.actions;

// Thunks
const searchThunkTypePrefix = 'users/search';
export const searchThunk = createAsyncThunk(
  searchThunkTypePrefix,
  async (userPayload: UserSearchPayload, thunkAPI) => {
    let userData: AxiosResponse<UserSearchResult>;

    const cachedPayload = memCache.get(searchThunkTypePrefix);

    const finalPayload = {
      per_page: ITEMS_PER_PAGE,
      ...(cachedPayload ?? {}),
      ...(userPayload ?? {}),
    };

    // cache
    memCache.set(searchThunkTypePrefix, finalPayload);

    try {
      userData = await AppApi.searchUsers(finalPayload);
    } catch (err) {
      console.error('Unable to get users.');
      throw err;
    }

    const { total_count, items } = userData.data;

    thunkAPI.dispatch(setTotal(total_count));
    thunkAPI.dispatch(search(items));
  });

