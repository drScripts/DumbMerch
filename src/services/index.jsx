import { Axios } from "axios";

const axios = new Axios({ baseURL: "http://localhost:5000/api/v1" });

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Ik5hdGhhbmFlbCBWYWxlbnRpbm8gRGF2aXMiLCJlbWFpbCI6Im5hdGhhbmFlbDEudmRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyMi0wNC0wNVQwNjoyMDozMC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMi0wNC0wNVQwNjoyMDozMC4wMDBaIiwicHJvZmlsZSI6eyJpZCI6MiwicGhvbmVfbnVtYmVyIjpudWxsLCJnZW5kZXIiOm51bGwsImFkZHJlc3MiOm51bGwsInVzZXJJZCI6MiwicHJvZmlsZV9waWN0dXJlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIyLTA0LTA1VDA2OjIwOjMwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA0LTA1VDA2OjIwOjMwLjAwMFoifSwiaWF0IjoxNjQ5MTQ2MzgyfQ.J830tMQMA0owatpo44fi3h1ZCsM32yvhSu-vLseN9qg";

export const pubPost = async (path, body, isRaw = false, headers = {}) => {
  const type = isRaw ? { "Content-Type": "application/json" } : {};
  const dataBody = isRaw ? JSON.stringify(body) : body;

  const { data, status } = await axios
    .post(path, dataBody, {
      headers: {
        ...type,
      },
    })
    .catch((response) => {
      return {
        data: response.data.data,
        status: response.status,
      };
    });

  const responseData = JSON.parse(data);

  return { data: responseData.data, status, message: responseData.message };
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

export const privatePost = async (path, isRaw = false, body) => {
  const type = isRaw ? { "Content-Type": "application/json" } : {};
  const { data, status } = await axios
    .post(path, body, {
      headers: {
        Authorization: `Bearer ${mockToken}`,
        ...type,
      },
    })
    .catch((response) => {
      return {
        data: response.data.data,
        status: response.status,
      };
    });
  return {
    data: JSON.parse(data).data,
    status,
    message: JSON.parse(data).message,
  };
};

export const patch = async (path, body) => {
  const { data, status } = await axios
    .patch(path, body, {
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    })
    .catch((response) => {
      return {
        data: response.data.data,
        status: response.status,
      };
    });

  return {
    data: JSON.parse(data).data,
    status,
    message: JSON.parse(data).message,
  };
};

export const destroy = async (path) => {
  const { data, status } = await axios
    .delete(path, {
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    })
    .catch((response) => {
      return {
        data: response.data.data,
        status: response.status,
      };
    });

  return {
    data: JSON.parse(data).data,
    status,
    message: JSON.parse(data).message,
  };
};

export default axios;
