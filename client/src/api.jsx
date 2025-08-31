import axios from "axios";

const API = axios.create({
  baseURL: "https://qwipobackendassignment.onrender.com/api/customers",
});

// Customers
export const getAllCustomers = (page = 1, limit = 3) =>
  API.get("/", { params: { page, limit } });

export const getCustomerById = (id) => API.get(`/${id}`);
export const createCustomer = (data) => API.post("/", data);
export const updateCustomer = (id, data) => API.put(`/${id}`, data);
export const deleteCustomer = (id) => API.delete(`/${id}`);
export const searchCustomers = (params) => API.get("/search", { params });

// Addresses
export const getAddresses = (customerId) => API.get(`/${customerId}/addresses`);
export const getSingleAddress = (customerId, addressId) =>
  API.get(`/${customerId}/addresses/${addressId}`);
export const addAddress = (customerId, data) =>
  API.post(`/${customerId}/addresses`, data);
export const updateAddress = (customerId, addressId, data) =>
  API.put(`/${customerId}/addresses/${addressId}`, data);
export const deleteAddress = (customerId, addressId) =>
  API.delete(`/${customerId}/addresses/${addressId}`);
