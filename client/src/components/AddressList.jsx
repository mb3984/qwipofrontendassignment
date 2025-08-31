import React, { useEffect, useState } from "react";
import {
  getAddresses,
  deleteAddress,
  addAddress,
  updateAddress,
} from "../api.jsx";
import AddressForm from "./AddressForm.jsx";
import "./AddressList.css"; // ✅ Import CSS file

const AddressList = ({ customer }) => {
  const [addresses, setAddresses] = useState([]);
  const [editAddressId, setEditAddressId] = useState(null);

  const fetchAddresses = async () => {
    const res = await getAddresses(customer.id);
    setAddresses(res.data);
  };

  useEffect(() => {
    fetchAddresses();
  }, [customer]);

  const handleDelete = async (id) => {
    await deleteAddress(customer.id, id);
    fetchAddresses();
    alert("Address deleted successfully");
  };

  const handleEdit = (id) => {
    setEditAddressId(id);
  };

  const handleCancelEdit = () => {
    setEditAddressId(null);
  };

  return (
    <div className="address-container">
      <h3 className="address-title">Addresses for {customer.firstName}</h3>
      <AddressForm
        customerId={customer.id}
        onSuccess={() => {
          fetchAddresses();
          setEditAddressId(null);
        }}
        editAddressId={editAddressId}
        addressData={addresses.find((a) => a.id === editAddressId)}
        onCancel={handleCancelEdit}
      />

      <ul className="address-list">
        {addresses.map((a) => (
          <li key={a.id} className="address-item">
            <p className="address-text">
              {a.address}, {a.city}, {a.state}, {a.country} - {a.postalCode}
            </p>
            <div className="address-actions">
              <button className="edit-btn" onClick={() => handleEdit(a.id)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(a.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;
