import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const randomWarehouses = [
    { name: "Alpha Dam", location: "Colorado River, USA" },
    { name: "Beta Factory", location: "Lake Michigan, USA" },
    { name: "Gamma Reservoir", location: "Yellowstone Park, USA" },
    { name: "Delta Power Plant", location: "Mississippi River, USA" },
    { name: "Epsilon Waterworks", location: "Mekong River, Laos" },
  ];
  let kaha = localStorage.getItem("isadmin");
  console.log(kaha);
  useEffect(() => {
    // Fetching warehouses if the user is an admin
    if (localStorage.getItem("isadmin") === "true") {
      setIsAdmin(true);
      fetchWarehouses();
    }
  }, []);

  // Fetch warehouses added by the admin
  const fetchWarehouses = async () => {
    try {
      const response = await axios.get("http://localhost:1000/warehouses");
      setWarehouses(response.data); // Assuming this returns an array of warehouses
    } catch (error) {
      console.error("Error fetching warehouses", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6 ">
        <div className="flex items-center justify-around space-x-6">
          {/* Profile Section */}
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
            <img
              src="data:image/png;base64,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"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {localStorage.getItem("username")}
            </h1>
            <p className="text-lg text-gray-600">
              {localStorage.getItem("email")}
            </p>
            <p className="text-lg font-bold text-red-600 mt-2">
              {isAdmin ? "You are an Admin" : "You are an Employee"}
            </p>
          </div>
          {isAdmin && (
            <div>
              <Link
                className="font-bold text-2xl bg-green-600 p-3 rounded text-white"
                to="/createawarehouse"
              >
                Create a warehouse + +
              </Link>
            </div>
          )}
        </div>

        {/* Warehouses Section (only visible for admins) */}
        {isAdmin && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Warehouses Added by You
            </h2>
            {warehouses.length > 0 ? (
              <ul className="space-y-4">
                {warehouses.map((warehouse, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold text-gray-700">
                      {warehouse.name}
                    </h3>
                    <p className="text-gray-600">{warehouse.location}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">
                You have not added any warehouses yet.
              </p>
            )}
          </div>
        )}

        {/* Random Warehouses Section (visible to all users) */}
        <div>
          {isAdmin && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Random Warehouses
              </h2>
              <ul className="space-y-4">
                {randomWarehouses.map((warehouse, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold text-gray-700">
                      {warehouse.name}
                    </h3>
                    <p className="text-gray-600">{warehouse.location}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* If the user is not an admin, display a simple message */}
        {!isAdmin && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-gray-700">
              As an employee, you do not have access to manage warehouses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
