/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./tracking.css";
import React, { useEffect, useState } from "react"; // Pastikan untuk mengimpor useState jika belum
import Information from "../../../components/Content/Information/Information";
import BoxInput from "../../../components/Elements/BoxInput/BoxInput";
import Navbar from "../../../components/Content/Navbar/Navbar";
import Button from "../../../components/Elements/Buttons/Button";
import moment from "moment";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
const { RangePicker } = DatePicker;
import { GoogleMap, Polyline, useLoadScript } from "@react-google-maps/api";
import { MarkerF } from "@react-google-maps/api";

const DetaildataTracking = (props) => {
  const navigate = useNavigate();
  const [dates, setDates] = useState([]);
  const [nik, setNik] = useState("");
  const [mapPositionData, setMapPositionData] = useState([]);

  console.log(dates);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setNik(value);
    console.log(value);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return navigate("/login");
    }
  }, [navigate]);

  const [startDate, endDate] = dates;
  const [initialCenter, setInitialCenter] = useState({
    lat: 0, // Set to default value
    lng: 0, // Set to default value
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!token) {
      return navigate("/login");
    }

    const requestParam = {
      startDate: startDate,
      endDate: endDate,
      nik: nik,
    };

    console.log("Request Param " + requestParam);
    console.log("Token " + token);
    try {
      const response = await axios.get(
        "http://localhost:8081/api/detail-data/tracking-view",
        {
          params: requestParam,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success === false) {
        Swal.fire({
          title: "Error!",
          text: response.data.message,
          icon: "error",
        });
      } else {
        setMapPositionData(response.data.data);
        console.log("RESPONSE " + JSON.stringify(response.data, null, 2));
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.response.data,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    // Update initial center when mapPositionData changes
    if (mapPositionData.length > 0) {
      const firstPosition = mapPositionData[0];
      setInitialCenter({
        lat: firstPosition.latitude,
        lng: firstPosition.longitude,
      });
    } else {
      setInitialCenter({
        lat: 0,
        lng: 0,
      });
    }
  }, [mapPositionData]);
  console.log("MAP POSITION DATA : " + JSON.stringify(mapPositionData, null));
  const libraries = ["places"];
  const mapContainerStyle = {
    width: "100%", // Lebar peta
    height: "100%", // Tinggi peta
  };

  const infoMiddleStyles = {
    position: "relative",
    width: "100%", // Lebar information__middle
    height: "700px", // Tinggi information__middle
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBF6HLnBEPixHrgDUsq8p90K3rVZYgiN_I",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  const userPhotoUrl = localStorage.getItem("foto");

  return (
    <div className="content__container">
      <Navbar navbarText="Detail Data / Tracking" />
      <div className="input__container">
        <div className="left__container__input">
          <RangePicker
            onChange={(values) => {
              // Ambil start date

              setDates(
                values.map((item) => {
                  return item.format("YYYY-MM-DD");
                })
              );
            }}
          />
          <BoxInput
            placeholder="NIK"
            value={nik}
            onChange={(e) => handleInputChange(e)}
          />
          <Button
            text="Pencarian"
            className="search__button"
            onClick={handleClick}
          />
        </div>
        <div className="right__container__input">
          {/* Isi dari right__container__input */}
        </div>
      </div>
      {/* Map component */}
      <div className="information__middle" style={infoMiddleStyles}>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={initialCenter}
          >
            {mapPositionData.map((position, index) => (
              <React.Fragment key={index}>
                <MarkerF
                  position={{ lat: position.latitude, lng: position.longitude }}
                  title={`Marker ${index + 1}`} // Tambahkan properti title dengan nilai urutan marker
                />
                {index > 0 && (
                  <Polyline
                    path={[
                      {
                        lat: mapPositionData[index - 1].latitude,
                        lng: mapPositionData[index - 1].longitude,
                      },
                      { lat: position.latitude, lng: position.longitude },
                    ]}
                    options={{
                      strokeColor: "blue", // Warna garis
                      strokeOpacity: 1, // Opasitas garis
                      strokeWeight: 2, // Ketebalan garis
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default DetaildataTracking;
