import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WarehousePage = () => {
  const [warehouse, setWarehouse] = useState([]);
  const navigate = useNavigate();

  const getallwarehouse = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1000/agglomeration/user/allwarehouse"
      );
      console.log(response.data.data);
      setWarehouse(response.data.data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  const buttonhandle = (url) => {
    navigate(`/show_watermanagement/${url}`);
  };

  useEffect(() => {
    getallwarehouse();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-8">
        Warehouse List
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {warehouse.map((item) => (
          <div
            key={item.Deviceid}
            className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all cursor-pointer"
          >
            <h3 className="text-xl font-medium text-gray-800">{item.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{item.location}</p>
            <div className="mt-4">
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Device ID: </span>
                {item.Deviceid}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Assigned User: </span>
                {item.assigned_user}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Admin: </span>
                {item.admin}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="text-sm text-blue-500 font-semibold hover:text-blue-700"
                onClick={() => buttonhandle(item.Deviceid)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarehousePage;
