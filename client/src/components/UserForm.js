import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { fetchData, postData } from "../services/apiService";
import Navbar from "./Navbar";
//import { NavLink } from "react-router-dom";

const UserForm = () => {
  const history = useHistory();
  const { id } = useParams();

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
  });
  const [mode, setMode] = useState("create"); // 'create' or 'edit'

  useEffect(() => {
    if (id) {
      setMode("edit");
      const fetchDataForEdit = async () => {
        try {
          const data = await fetchData(`getuser/${id}`);
          // Exclude _id and __v from the state
          const { _id, __v, ...userData } = data;
          setINP(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchDataForEdit();
    }
  }, [id]);

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { ...inpval };

    try {
      await postData(
        `${mode === "edit" ? `updateuser/${id}` : "create"}`,
        userData,
        mode === "edit" ? "PATCH" : "POST"
      );
      alert("Data saved successfully");
      history.push("/home");
    } catch (error) {
      alert("Error saving data: " + error.message);
    }
  };

  return (
    <div className="container">
      {/* <NavLink to="/">Home</NavLink> */}
      <Navbar />
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="row">
          {/* Form fields */}
          {Object.keys(inpval).map((key) => (
            <div key={key} className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor={key} className="form-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {key === "desc" ? (
                <textarea
                  name={key}
                  onChange={setdata}
                  value={inpval[key]}
                  className="form-control"
                  id={key}
                  cols="30"
                  rows="5"
                ></textarea>
              ) : (
                <input
                  type={key === "email" ? "email" : "text"}
                  name={key}
                  onChange={setdata}
                  value={inpval[key]}
                  className="form-control"
                  id={key}
                />
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            {mode === "edit" ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
