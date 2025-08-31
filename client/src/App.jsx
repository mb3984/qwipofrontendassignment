import React, { useEffect, useState } from "react";
import { getAllCustomers } from "./api.jsx";
import CustomerList from "./components/CustomerList.jsx";

const App = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const res = await getAllCustomers();
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h1>Customer Management</h1>
      <CustomerList customers={customers} refresh={fetchCustomers} />
    </div>
  );
};

export default App;
