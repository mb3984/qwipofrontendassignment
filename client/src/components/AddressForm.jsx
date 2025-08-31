import React, { useState, useEffect } from "react";
import { addAddress, updateAddress } from "../api.jsx";
import "./AddressForm.css"; // ✅ Import CSS

const AddressForm = ({
  customerId,
  onSuccess,
  editAddressId,
  addressData,
  onCancel,
}) => {
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  useEffect(() => {
    if (addressData) setForm(addressData);
  }, [addressData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editAddressId) {
      await updateAddress(customerId, editAddressId, form);
      alert("Address updated successfully");
    } else {
      await addAddress(customerId, form);
      alert("Address added successfully");
    }
    setForm({ address: "", city: "", state: "", country: "", postalCode: "" });
    onSuccess();
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <input
        className="form-input"
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        name="state"
        placeholder="State"
        value={form.state}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        name="country"
        placeholder="Country"
        value={form.country}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        name="postalCode"
        placeholder="Postal Code"
        value={form.postalCode}
        onChange={handleChange}
        required
      />

      <div className="button-group">
        <button className="submit-btn" type="submit">
          {editAddressId ? "Update Address" : "Add Address"}
        </button>
        {editAddressId && (
          <button className="cancel-btn" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddressForm;
