import { User } from "./user.interface";

export interface UserSearchResult {
  total_count:        number;
  incomplete_results: boolean;
  items:              User[];
}
