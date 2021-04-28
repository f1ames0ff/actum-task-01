import axios from "axios";
import { UserSearchPayload } from "../types/search-user-payload.interface";
import { UserSearchResult } from "../types/user-search-result.interface";

export abstract class AppApi {
  private static readonly BASE_URL = 'https://api.github.com';
  private static readonly HEADERS = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: 'token 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'
  };

  static setDefaults() {
    axios.interceptors.request.use((config) => {
      config.headers = { ...config.headers, ...this.HEADERS };

      return config;
    });
  }

  static async searchUsers(params: UserSearchPayload) {
    const url = `${this.BASE_URL}/search/users`;

    return axios.get<UserSearchResult>(url, { params });
  }
}
