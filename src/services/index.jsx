import { Axios } from "axios";

const axios = new Axios({ baseURL: "http://localhost:5000/api/v1" });

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Ik5hdGhhbmFlbCBWYWxlbnRpbm8gRGF2aXMiLCJlbWFpbCI6Im5hdGhhbmFlbDEudmRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyMi0wNC0wNVQwNjoyMDozMC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMi0wNC0wNVQwNjoyMDozMC4wMDBaIiwicHJvZmlsZSI6eyJpZCI6MiwicGhvbmVfbnVtYmVyIjpudWxsLCJnZW5kZXIiOm51bGwsImFkZHJlc3MiOm51bGwsInVzZXJJZCI6MiwicHJvZmlsZV9waWN0dXJlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIyLTA0LTA1VDA2OjIwOjMwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA0LTA1VDA2OjIwOjMwLjAwMFoifSwiaWF0IjoxNjQ5MTQ2MzgyfQ.J830tMQMA0owatpo44fi3h1ZCsM32yvhSu-vLseN9qg";

export const pubPost = async (path, body) => {
  const { data, status, message } = await axios
    .post(path, body)
    .catch((response) => {
      return {
        data: response.data.data,
        status: response.status,
        message: response.data.message,
      };
    });

  return { data, status, message };
};

export const privateGet = async (path, queryParams) => {
  const { data, status, message } = await axios
    .get(path, {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    })
    .catch((response) => {
      return {
        data: response.data.data,
        status: response.status,
        message: response.data.message,
      };
    });

  return { data: JSON.parse(data).data, status, message };
};

export const privatePost = async (path, body) => {
  const { data, status, message } = await axios
    .post(path, body, {
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    })
    .catch((response) => {
      return {
        data: response.data,
        status: response.status,
        message: response.data.message,
      };
    });
  return { data, status, message };
};

export default axios;
