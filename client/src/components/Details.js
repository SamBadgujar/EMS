// src/components/Details.js

import React, { useState, useEffect, useCallback } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useHistory, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { fetchData, deleteData } from "../services/apiService";
import Navbar from "./Navbar";

const Details = () => {
  const [userdata, setUserdata] = useState({});
  const { id } = useParams();
  const history = useHistory();

  const getData = useCallback(async () => {
    try {
      const data = await fetchData(`getuser/${id}`);
      setUserdata(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleDelete = async () => {
    try {
      await deleteData(`deleteuser/${userdata._id}`);
      history.push("/home");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mt-3">
      <Navbar />
      <h1 style={{ fontWeight: 400 }}>Welcome {userdata.name}</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src="/profile.png" style={{ width: 100 }} alt="profile" />
              <h3 className="mt-3">
                Name: <span> {userdata.name}</span>
              </h3>
              <h3 className="mt-3">
                Age: <span> {userdata.age}</span>
              </h3>
              <p className="mt-3">
                <MailOutlineIcon />
                Email: <span> {userdata.email}</span>
              </p>
              <p className="mt-3">
                <WorkIcon />
                Occupation: <span> {userdata.work}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <div className="add_btn">
                <NavLink to={`/edit/${userdata._id}`}>
                  <button className="btn btn-primary mt-5 mb-2 mx-2">
                    <CreateIcon />
                  </button>
                </NavLink>
                <button
                  className="btn btn-danger mt-5 mb-2"
                  onClick={handleDelete}
                >
                  <DeleteOutlineIcon />
                </button>
              </div>
              <p className="mt-4">
                <PhoneAndroidIcon />
                Mobile: <span> {userdata.mobile}</span>
              </p>
              <p className="mt-3">
                <LocationOnIcon />
                Location: <span> {userdata.add}</span>
              </p>
              <p className="mt-3">
                Description: <span> {userdata.desc}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
