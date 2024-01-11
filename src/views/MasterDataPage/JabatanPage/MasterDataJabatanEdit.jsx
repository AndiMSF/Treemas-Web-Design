/* eslint-disable no-unused-vars */
import "./jabatanedit.css";
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
// SweetAlert
import Swal from "sweetalert2";

const MasterDataJabatanEdit = () => {
  const navigate = useNavigate();
  const [isToken, setIstoken] = useState("");

  // Data dari params
  const { id } = useParams();

  // Check siapa yang akses
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIstoken(token);
      console.log("Token: " + token);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Token is not available");
      return navigate("/login");
    }

    try {
      const requestData = {
        jabatanId: formData.jabatanId,
        namaJabatan: formData.namaJabatan,
      };

      const response = await axios.put(
        `http://localhost:8081/api/master-data/jabatan-form/edit/${id}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Jabatan Updated.",
        icon: "success",
      });
      navigate("/master-data/jabatan-view");
      console.log("Response from API:", response.data);
    } catch (error) {
      // Jika tidak berhasil, tampilkan pesan error
      console.error("Failed to fetch data:");
      Swal.fire({
        title: "Error!",
        text: "Failed to update jabatan.",
        icon: "error",
      });
    }
  };

  const {
    state: { selectedJabatan },
  } = useLocation();
  const initialFormData = selectedJabatan || { jabatanId: "", namaJabatan: "" };
  const [formData, setFormData] = useState(initialFormData);

  return (
    <div className="content__container">
      <div className="form__container">
        <div className="form__container__top">
          <h1>Jabatan Edit</h1>
          <div className="horizontal__line"></div>
        </div>
        <form>
          <div className="form__row">
            <div className="form__row__left">
              <p>ID</p>
            </div>
            <div className="form__row__right">
              <BoxInput
                placeholder="ID"
                value={formData.jabatanId}
                onChange={(e) => handleInputChange(e, "jabatanId")}
              />
            </div>
          </div>
          <div className="form__row">
            <div className="form__row__left">
              <p>Nama Jabatan</p>
            </div>
            <div className="form__row__right">
              <BoxInput
                placeholder="Nama Jabatan "
                value={formData.namaJabatan}
                onChange={(e) => handleInputChange(e, "namaJabatan")}
              />
            </div>
          </div>
          <div className="form__row__bottom">
            <Link
              to="/master-data/jabatan-view"
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
        </form>
      </div>
    </div>
  );
};

export default MasterDataJabatanEdit;
