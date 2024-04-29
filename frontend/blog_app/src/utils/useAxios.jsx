import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://127.0.0.1:8000/";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    if (!authTokens) return req; // If no tokens, just return request

    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp * 1000).isBefore(dayjs());

    if (!isExpired) return req; // If access token is not expired, return request

    try {
      const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authTokens.refresh
      });

      if (response.data && response.data.access) {
        // Store refreshed tokens
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setAuthTokens(response.data);
        setUser(jwt_decode(response.data.access));

        // Update request header with new access token
        req.headers.Authorization = `Bearer ${response.data.access}`;
      }

      return req;
    } catch (error) {
      // Handle refresh token error (e.g., refresh token expired)
      console.error("Error refreshing token:", error);
      // Handle logout or other actions accordingly
      return Promise.reject(error); // Propagate the error
    }
  });

  return axiosInstance;
};

export default useAxios;
