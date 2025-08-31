import React, { useEffect, useState } from "react";
import {
  getAllCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomer,
  searchCustomers,
} from "../api.jsx";
import AddressList from "./AddressList.jsx";
import "./CustomerList.css"; // 👈 Import CSS

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [formCustomer, setFormCustomer] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [searchParams, setSearchParams] = useState({
    city: "",
    state: "",
    pincode: "",
  });

  const [page, setPage] = useState(1);
  const limit = 3;
  const [totalPages, setTotalPages] = useState(1);

  const fetchCustomers = async () => {
    let res;
    if (searchParams.city || searchParams.state || searchParams.pincode) {
      res = await searchCustomers(searchParams);
      setCustomers(res.data);
      setTotalPages(1);
    } else {
      res = await getAllCustomers(page, limit);
      setCustomers(res.data.data);
      setTotalPages(res.data.totalPages);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page]);

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    fetchCustomers();
    alert("Customer deleted successfully");
  };

  const handleEdit = (customer) => {
    setEditingCustomerId(customer.id);
    setFormCustomer(customer);
  };

  const handleCancelEdit = () => {
    setEditingCustomerId(null);
    setFormCustomer({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  const handleChange = (e) => {
    setFormCustomer({ ...formCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCustomerId) {
      await updateCustomer(editingCustomerId, formCustomer);
      alert("Customer updated successfully");
      setEditingCustomerId(null);
    } else {
      await createCustomer(formCustomer);
      alert("Customer added successfully");
    }
    setFormCustomer({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
    fetchCustomers();
  };

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setPage(1);
    const res = await searchCustomers(searchParams);
    setCustomers(res.data);
    setTotalPages(1);
  };

  const handleResetSearch = () => {
    setSearchParams({ city: "", state: "", pincode: "" });
    setPage(1);
    fetchCustomers();
  };

  return (
    <div className="customer-container">
      <h2 className="title">Customer List</h2>

      {/* 🔍 Search Bar */}
      <div className="search-box">
        <h3>Search Customers</h3>
        <div className="search-fields">
          <input
            name="city"
            placeholder="City"
            value={searchParams.city}
            onChange={handleSearchChange}
          />
          <input
            name="state"
            placeholder="State"
            value={searchParams.state}
            onChange={handleSearchChange}
          />
          <input
            name="pincode"
            placeholder="Pincode"
            value={searchParams.pincode}
            onChange={handleSearchChange}
          />
        </div>
        <div className="search-actions">
          <button onClick={handleSearch}>Search</button>
          <button className="reset-btn" onClick={handleResetSearch}>
            Reset
          </button>
        </div>
      </div>

      {/* 📝 Add/Edit Customer Form */}
      <h3>{editingCustomerId ? "Edit Customer" : "Add New Customer"}</h3>
      <form className="customer-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            name="firstName"
            placeholder="First Name"
            value={formCustomer.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formCustomer.lastName}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formCustomer.phone}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={formCustomer.email}
            onChange={handleChange}
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={formCustomer.address}
            onChange={handleChange}
            required
          />
          <input
            name="city"
            placeholder="City"
            value={formCustomer.city}
            onChange={handleChange}
            required
          />
          <input
            name="state"
            placeholder="State"
            value={formCustomer.state}
            onChange={handleChange}
            required
          />
          <input
            name="pincode"
            placeholder="Pincode"
            value={formCustomer.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">
            {editingCustomerId ? "Update Customer" : "Add Customer"}
          </button>
          {editingCustomerId && (
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* 📋 Customer List */}
      <ul className="customer-list">
        {customers.map((c) => (
          <li key={c.id} className="customer-card">
            <p>
              <strong>
                {c.firstName} {c.lastName}
              </strong>
            </p>
            <p>
              {c.city}, {c.state}
            </p>
            <div className="customer-actions">
              <button onClick={() => setSelectedCustomer(c)}>
                View Addresses
              </button>
              <button onClick={() => handleEdit(c)}>Edit</button>
              <button onClick={() => handleDelete(c.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* 📄 Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* 🏠 Address List */}
      {selectedCustomer && <AddressList customer={selectedCustomer} />}
    </div>
  );
};

export default CustomerList;
