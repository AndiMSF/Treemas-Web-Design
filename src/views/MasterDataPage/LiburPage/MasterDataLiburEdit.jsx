/* eslint-disable no-unused-vars */
import "./liburedit.css";
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

const MasterDataLiburEdit = () => {
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

    try {
      const requestData = {
        tglLibur: formData.tglLibur,
        keterangan: formData.keterangan,
      };

      const response = await axios.put(
        `http://localhost:8081/api/master-data/libur-form/edit/${id}`,
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
        text: "Libur Updated.",
        icon: "success",
      });
      navigate("/master-data/libur-view");
      console.log("Response from API:", response.data);
    } catch (error) {
      // Jika tidak berhasil, tampilkan pesan error
      console.error("Failed to fetch data:");
      Swal.fire({
        title: "Error!",
        text: "Failed to update libur.",
        icon: "error",
      });
    }
  };

  // Data sebelumnya
  const {
    state: { selectedLibur },
  } = useLocation();
  const initialFormData = selectedLibur || { tglLibur: "", keterangan: "" };
  const [formData, setFormData] = useState(initialFormData);

  return (
    <div className="content__container">
      <div className="form__container">
        <div className="form__container__top">
          <h1>Libur Form</h1>
          <div className="horizontal__line"></div>
        </div>
        <form>
          <div className="form__row">
            <div className="form__row__left">
              <p>Tanggal Libur</p>
            </div>
            <div className="form__row__right">
              <BoxInput
                placeholder="Tanggal Libur"
                value={formData.tglLibur}
                onChange={(e) => handleInputChange(e, "tglLibur")}
              />
            </div>
          </div>
          <div className="form__row">
            <div className="form__row__left">
              <p>Keterangan</p>
            </div>
            <div className="form__row__right">
              <BoxInput
                placeholder="Keterangan"
                value={formData.keterangan}
                onChange={(e) => handleInputChange(e, "keterangan")}
              />
            </div>
          </div>
          <div className="form__row__bottom">
            <Link
              to="/master-data/libur-view"
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

export default MasterDataLiburEdit;
