import axios, { AxiosResponse } from "axios";
import Constants from "@utils/Contstants";
import { getToken } from "@utils/storage";

/**
 * Generic GET request method
 * @param endpoint - API endpoint (e.g. "/users/users")
 * @returns Response data
 */
export const getData = async <T = any>(endpoint: string): Promise<T> => {
  try {
    const token = getToken();
    const url = `${Constants.MainUrl}${endpoint}`;

    const response: AxiosResponse<T> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("GET request error:", error?.response?.data || error.message);
    throw error;
  }
};

/**
 * Generic POST request method
 * @param endpoint - API endpoint (e.g. "/users/chats/send")
 * @param body - Request body object
 * @returns Response data
 */
export const postData = async <T = any>(
  endpoint: string,
  body: Record<string, any>
): Promise<T> => {
  try {
    const token = getToken();
    const url = `${Constants.MainUrl}${endpoint}`;

    const response: AxiosResponse<T> = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("POST request error:", error?.response?.data || error.message);
    throw error;
  }
};
