/* eslint-disable no-unused-vars */
import "./cutiedit.css";
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
import Swal from "sweetalert2";
import { Form, InputGroup } from "react-bootstrap";

const MasterDataCutiEdit = () => {
  const navigate = useNavigate();
  const [isToken, setIstoken] = useState("");

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
        id: formData.id,
        value: formData.value,
        cutiDesc: formData.cutiDesc,
      };

      const response = await axios.put(
        `http://localhost:8081/api/master-data/cuti-form/edit/${id}`,
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
        text: "Cuti Updated.",
        icon: "success",
      });
      navigate("/master-data/cuti-view");
      console.log("Response from API:", response.data);
    } catch (error) {
      // Jika tidak berhasil, tampilkan pesan error
      console.error("Failed to fetch data:");
      Swal.fire({
        title: "Error!",
        text: "Failed to update cuti.",
        icon: "error",
      });
    }
  };

  const {
    state: { selectedCuti },
  } = useLocation();
  const initialFormData = selectedCuti || { id: "", cutiDesc: "", value: "" };
  const [formData, setFormData] = useState(initialFormData);

  return (
    <div className="content__container">
      <div className="form__container">
        <div className="form__container__top">
          <h1>Cuti Form</h1>
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
                value={formData.id}
                onChange={(e) => handleInputChange(e, "id")}
              />
            </div>
          </div>
          <div className="form__row">
            <div className="form__row__left">
              <p>Jumlah</p>
            </div>
            <div className="form__row__right">
              <InputGroup>
                <Form.Control
                  placeholder="Jumlah"
                  aria-label="Jumlah"
                  aria-describedby="basic-addon2"
                  value={formData.value}
                  onChange={(e) => handleInputChange(e, "value")}
                />
                <InputGroup.Text id="basic-addon2">Hari</InputGroup.Text>
              </InputGroup>
            </div>
          </div>
          <div className="form__row">
            <div className="form__row__left">
              <p>Keterangan</p>
            </div>
            <div className="form__row__right">
              <BoxInput
                placeholder="Keterangan"
                value={formData.cutiDesc}
                onChange={(e) => handleInputChange(e, "cutiDesc")}
              />
            </div>
          </div>
          <div className="form__row__bottom">
            <Link
              to="/master-data/cuti-view"
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

export default MasterDataCutiEdit;
