import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Createwarehouse() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [Deviceid, SetDeviceid] = useState("");
  const [Assigned_user, setAssigneduser] = useState("");
  const [validDeviceIds, setValidDeviceIds] = useState([]);
  const [validEmails, setValidEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const get_email = async () => {
    const response = await axios.get(
      "http://localhost:1000/agglomeration/user/all_email"
    );
    setValidEmails(response.data);
  };

  const get_uid = async () => {
    const response = await axios.get(
      "http://localhost:1000/agglomeration/user/all_aid"
    );
    setValidDeviceIds(response.data);
  };

  useEffect(() => {
    get_email();
    get_uid();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDeviceidChange = (e) => {
    SetDeviceid(e.target.value);
  };

  const handleAssignedUserChange = (e) => {
    setAssigneduser(e.target.value);
  };
  const navigate = useNavigate();
  const handleform = async (e) => {
    e.preventDefault();
    try {
      let admin = localStorage.getItem("itemhai");
      console.log(name, location, Deviceid, Assigned_user);
      const response = await axios.post(
        "http://localhost:1000/agglomeration/user/createwarehouse",
        {
          name,
          location,
          Deviceid,
          Assigned_user,
          admin,
        }
      );
      console.log(response);
      if (response.data.message) {
        navigate("/warehouses");
      }
      toast.success("done");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleform}>
      <div className="flex items-center justify-center p-10 m-10">
        <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
            <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
              Create a warehouse
            </h3>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                value={name}
                onChange={handleNameChange}
                placeholder=""
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all">
                Warehouse Name
              </label>
            </div>

            <div className="relative h-11 w-full min-w-[200px]">
              <input
                value={location}
                onChange={handleLocationChange}
                placeholder=""
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all">
                Location
              </label>
            </div>

            {/* Dropdown for Deviceid */}
            <div className="relative h-11 w-full min-w-[200px]">
              <select
                value={Deviceid}
                onChange={handleDeviceidChange}
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0"
              >
                <option value="">Select Device ID</option>
                {validDeviceIds.map((device) => (
                  <option key={device} value={device}>
                    {device}
                  </option>
                ))}
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all">
                Device ID
              </label>
            </div>

            {/* Dropdown for Assigned User */}
            <div className="relative h-11 w-full min-w-[200px]">
              <select
                value={Assigned_user}
                onChange={handleAssignedUserChange}
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0"
              >
                <option value="">Select Assigned User</option>
                {validEmails.map((email) => (
                  <option key={email} value={email}>
                    {email}
                  </option>
                ))}
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all">
                Assigned Username
              </label>
            </div>

            <button
              className="mb-4 flex justify-center rounded bg-cyan-500 py-3 text-white font-medium shadow-md hover:bg-cyan-400"
              type="submit"
            >
              Create Warehouse
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}

export default Createwarehouse;
