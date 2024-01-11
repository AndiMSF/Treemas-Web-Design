/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import "./projectform.css";
import BoxInput from "../../../components/Elements/BoxInput/BoxInput";
import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom/dist";
import axios from "axios";
import Button from "../../../components/Elements/Buttons/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import TextArea from "../../../components/Elements/TextArea/TextArea";
import Information from "../../../components/Content/Information/Information";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { TimePicker } from "react-ios-time-picker"; // eslint-disable-next-line react-refresh/only-export-components
import Swal from "sweetalert2";
const MasterDataProjectEdit = () => {
  // Data dari params
  const { id } = useParams();
  const {
    state: { selectedProject },
  } = useLocation();
  const initialFormData = selectedProject || {
    projectId: "",
    namaProject: "",
    noTlpn: "",
    kota: "",
    biayaReimburse: "",
    jrkMax: "",
    jamKerja: "",
    jamMasuk: "10:00",
    jamKeluar: "10:00",
  };

  const [formData, setFormData] = useState(initialFormData);

  // Menghilangkan ":00" di akhir dari formData.jamMasuk dan formData.jamKeluar
  const formattedJamMasuk = formData.jamMasuk.slice(0, -3);
  const formattedJamKeluar = formData.jamKeluar.slice(0, -3);
  const [jamMasuk, setJamMasuk] = useState(formattedJamMasuk);
  const [jamKeluar, setJamKeluar] = useState(formattedJamKeluar);

  const navigate = useNavigate();
  const [isToken, setIstoken] = useState("");

  // Check siapa yang akses
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIstoken(token);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChangeMap = (event, field) => {
    const { value } = event.target;
    setSelectedMap({ ...selectedMap, [field]: value });
  };

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setFormData({ ...formData, [field]: value });
  };

  const handleJamMasukChange = (timeValue) => {
    setJamMasuk(timeValue);
  };

  const handleJamKeluarChange = (timeValue) => {
    setJamKeluar(timeValue);
  };

  useEffect(() => {
    console.log(jamMasuk);
  }, [jamMasuk]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        projectId: formData.projectId,
        namaProject: formData.namaProject,
        noTlpn: formData.noTlpn,
        kota: formData.kota,
        biayaReimburse: formData.biayaReimburse,
        jrkMax: formData.jrkMax,
        jamKerja: formData.jamKerja,
        jamMasuk: jamMasuk,
        jamKeluar: jamKeluar,
        lokasi: selectedMap.address,
        gpsLatitude: selectedMap.lat,
        gpsLongitude: selectedMap.lng,
      };

      const response = await axios.put(
        `http://localhost:8081/api/master-data/project-form/edit/${id}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + isToken,
          },
        }
      );
      console.log("REQUEST DATA : " + requestData);
      console.log("Response from API:", response.data);
      // Display the alert
      Swal.fire({
        title: "Success!",
        text: "Project Updated.",
        icon: "success",
      });
      navigate("/master-data/project-view");
    } catch (error) {
      console.log(
        "Failed To Update Project " + JSON.stringify(error.response, null, 2)
      );
      Swal.fire({
        title: "Error!",
        text: "Failed To Update Project.",
        icon: "error",
      });
    }
  };

  const libraries = ["places"];
  const mapContainerStyle = {
    width: "100%", // Lebar peta
    height: "100%", // Tinggi peta
  };

  const [selectedMap, setSelectedMap] = useState({
    lat: initialFormData.gpsLatitude, // default latitude
    lng: initialFormData.gpsLongitude, // default longitude,
    address: initialFormData.lokasi,
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBF6HLnBEPixHrgDUsq8p90K3rVZYgiN_I",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    // Buat URL Geocoding API dengan kunci API dan koordinat latitude-longitude
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA1tH4Nq364y6knELo5DwSWIwyvxNRF2b8`;

    // Lakukan permintaan ke API Geocoding
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK" && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          setSelectedMap({
            lat,
            lng,
            address,
          });

          console.log("CLICK MAP:", {
            lat,
            lng,
            address,
          });
        } else {
          console.error("Failed to retrieve address from Geocoding API");
        }
      })
      .catch((error) => {
        console.error("Error fetching Geocoding API:", error);
      });
  };

  return (
    <div className="content__container project__container">
      <div className="form__container project_form__container">
        <div className="form__container__top form__container__top__project">
          <h1>Project Form</h1>
          <div className="horizontal__line"></div>
        </div>

        <div className="form__container__middle">
          <div className="form__row">
            <div className="form__row__left">
              <p>
                ID <span style={{ color: "red" }}>*</span>
              </p>
            </div>
            <div className="form__row__right">
              <BoxInput
                project={true}
                disabled={true}
                placeholder="ID"
                value={formData.projectId}
                onChange={(e) => handleInputChange(e, "projectId")}
              />
            </div>
          </div>

          <div className="form__row">
            <div className="form__row__left">
              <p>
                Nama Project <span style={{ color: "red" }}>*</span>
              </p>
            </div>
            <div className="form__row__right">
              <BoxInput
                placeholder="Nama Project"
                value={formData.namaProject}
                onChange={(e) => handleInputChange(e, "namaProject")}
              />
            </div>
          </div>

          <div className="form__row">
            <div className="form__row__left">
              <p>No Telepon</p>
            </div>
            <div className="form__row__right">
              <BoxInput
                placeholder="No Telepon"
                value={formData.noTlpn}
                onChange={(e) => handleInputChange(e, "noTlpn")}
              />
            </div>
          </div>

          <div className="form__row">
            <div className="form__row__left">
              <p>Kota</p>
            </div>
            <div className="form__row__right">
              <BoxInput
                placeholder="Kota"
                value={formData.kota}
                onChange={(e) => handleInputChange(e, "kota")}
              />
            </div>
          </div>

          <div className="form__row">
            <div className="form__row__left">
              <p>
                Alamat <span style={{ color: "red" }}>*</span>
              </p>
            </div>
            <div className="form__row__right">
              <TextArea
                placeholder="Alamat"
                value={selectedMap.address}
                onChange={(e) => handleInputChangeMap(e, "address")}
              />
            </div>
          </div>

          <div className="form__row">
            <div className="form__row__left">
              <p>
                Latitude <span style={{ color: "red" }}>*</span>
              </p>
            </div>
            <div className="form__row__right">
              <BoxInput
                placeholder="Latitude"
                value={selectedMap.lat}
                onChange={(e) => handleInputChangeMap(e, "lat")}
              />
            </div>
          </div>

          <div className="form__row">
            <div className="form__row__left">
              <p>
                Longitude <span style={{ color: "red" }}>*</span>
              </p>
            </div>
            <div className="form__row__right">
              <BoxInput
                placeholder="Longitude"
                value={selectedMap.lng}
                onChange={(e) => handleInputChangeMap(e, "lng")}
              />
            </div>
          </div>

          <div className="form__row">
            <div className="form__row__left">
              <p>
                Biaya Reimburse <span style={{ color: "red" }}>*</span>
              </p>
            </div>
            <div className="form__row__right">
              <InputGroup>
                <InputGroup.Text id="basic-addon1">Rp.</InputGroup.Text>
                <Form.Control
                  className="project__input"
                  placeholder="Jumlah"
                  aria-label="Jumlah"
                  aria-describedby="basic-addon1"
                  value={formData.biayaReimburse}
                  onChange={(e) => handleInputChange(e, "biayaReimburse")}
                />
              </InputGroup>
            </div>
          </div>

          <div className="form__row">
            <div className="form__row__left">
              <p>Jarak Maksimal</p>
            </div>
            <div className="form__row__right">
              <InputGroup>
                <Form.Control
                  className="project__input"
                  placeholder="Jarak Maksimal"
                  aria-label="Jarak Maksimal"
                  aria-describedby="basic-addon2"
                  value={formData.jrkMax}
                  onChange={(e) => handleInputChange(e, "jrkMax")}
                />
                <InputGroup.Text id="basic-addon2">Meter</InputGroup.Text>
              </InputGroup>
            </div>
          </div>

          <div className="form__row">
            <div className="form__row__left">
              <p>Total Jam Kerja</p>
            </div>
            <div className="form__row__right">
              <InputGroup>
                <Form.Control
                  className="project__input"
                  placeholder="Total Jam Kerja"
                  aria-label="Total Jam Kerja"
                  aria-describedby="basic-addon2"
                  value={formData.jamKerja}
                  onChange={(e) => handleInputChange(e, "jamKerja")}
                />
                <InputGroup.Text id="basic-addon2">Jam/Hari</InputGroup.Text>
              </InputGroup>
            </div>
          </div>

          <div className="form__row">
            <div className="form__row__left">
              <p>Jam Masuk</p>
            </div>
            <div className="form__row__right">
              <TimePicker value={jamMasuk} onChange={handleJamMasukChange} />
            </div>
          </div>

          <div className="form__row">
            <div className="form__row__left">
              <p>Jam Keluar</p>
            </div>
            <div className="form__row__right">
              <TimePicker value={jamKeluar} onChange={handleJamKeluarChange} />
            </div>
          </div>
        </div>

        <div className="form__row__bottom">
          <Link
            to="/master-data/project-view"
            className="cancel__button"
            text="Cancel"
          >
            Cancel
          </Link>
          <Button
            className="submit__button"
            text="Submit"
            onClick={handleSubmit}
          />
        </div>
      </div>
      <div className="map__container">
        <div className="map__container__top">
          <h1>Set Location</h1>
          <div className="horizontal__line"></div>
        </div>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={selectedMap}
            onClick={(e) => handleMapClick(e)}
          >
            <MarkerF
              position={selectedMap}
              onClick={(e) => handleMapClick(e)}
            />
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default MasterDataProjectEdit;
