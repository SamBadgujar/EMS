import React, { useState, useEffect } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import { fetchData, deleteData } from "../services/apiService";
import Navbar from "./Navbar";
const Home = () => {
  const [userdata, setUserdata] = useState([]);

  const getData = async () => {
    try {
      const data = await fetchData("getdata");
      setUserdata(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteData(`deleteuser/${id}`);
      getData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="mt-5">
      <Navbar />
      <div className="container">
        <div className="add_btn mt-2 mb-2">
          <NavLink to="/create" className="btn btn-primary">
            Add data
          </NavLink>
        </div>
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Job</th>
              <th scope="col">Number</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {userdata.map((element, index) => (
              <tr key={element._id}>
                <th scope="row">{index + 1}</th>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>{element.work}</td>
                <td>{element.mobile}</td>
                <td className="d-flex justify-content-between">
                  <NavLink to={`view/${element._id}`}>
                    <button className="btn btn-success">
                      <RemoveRedEyeIcon />
                    </button>
                  </NavLink>
                  <NavLink to={`edit/${element._id}`}>
                    <button className="btn btn-primary">
                      <CreateIcon />
                    </button>
                  </NavLink>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(element._id)}
                  >
                    <DeleteOutlineIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
