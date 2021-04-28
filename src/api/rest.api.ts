import axios from "axios";
import { UserSearchPayload } from "../types/search-user-payload.interface";
import { UserSearchResult } from "../types/user-search-result.interface";

export abstract class AppApi {
  private static readonly BASE_URL = 'https://api.github.com';
  private static USER_TOKEN = 'Z2hwX2t0NTFEcnN5SE1LSHN5UnZQMk1XVGNVSW5HeU9ZRzNBS0lUSA==';
  private static readonly HEADERS = {
    Accept: 'application/vnd.github.v3+json'
  };

  static get token() {
    return atob(this.USER_TOKEN);
  }

  static setDefaults() {
    axios.interceptors.request.use((config) => {
      config.headers = {
        ...config.headers,
        ...this.HEADERS,
        ...{
          Authorization: `token ${this.token}`
        }
      };

      return config;
    });
  }

  static async searchUsers(params: UserSearchPayload) {
    const url = `${this.BASE_URL}/search/users`;

    return axios.get<UserSearchResult>(url, { params });
  }
}
