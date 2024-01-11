/* eslint-disable no-unused-vars */
import "./claimedit.css";
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
import { Form, InputGroup } from "react-bootstrap";

const MasterDataClaimEdit = () => {
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
        namaClaim: formData.namaClaim,
        valueClaim: formData.valueClaim,
        keterangan: formData.keterangan,
      };

      const response = await axios.put(
        `http://localhost:8081/api/master-data/claim-form/edit/${id}`,
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
        text: "Claim Updated.",
        icon: "success",
      });
      navigate("/master-data/claim-view");
      console.log("Response from API:", response.data);
    } catch (error) {
      // Jika tidak berhasil, tampilkan pesan error
      console.error("Failed to fetch data:");
      Swal.fire({
        title: "Error!",
        text: "Failed to update claim.",
        icon: "error",
      });
    }
  };

  // Data sebelumnya
  const {
    state: { selectedClaim },
  } = useLocation();
  const initialFormData = selectedClaim || {
    namaClaim: "",
    keterangan: "",
    valueClaim: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  return (
    <div className="content__container">
      <div className="form__container">
        <div className="form__container__top">
          <h1>Claim Edit</h1>
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
                value={formData.namaClaim}
                onChange={(e) => handleInputChange(e, "namaClaim")}
              />
            </div>
          </div>
          <div className="form__row">
            <div className="form__row__left">
              <p>Nominal</p>
            </div>
            <div className="form__row__right">
              <InputGroup>
                <InputGroup.Text id="basic-addon1">Rp.</InputGroup.Text>
                <Form.Control
                  placeholder="Nominal"
                  aria-label="Jumlah"
                  aria-describedby="basic-addon1"
                  value={formData.valueClaim}
                  onChange={(e) => handleInputChange(e, "valueClaim")}
                />
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
                value={formData.keterangan}
                onChange={(e) => handleInputChange(e, "keterangan")}
              />
            </div>
          </div>
          <div className="form__row__bottom">
            <Link
              to="/master-data/claim-view"
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

export default MasterDataClaimEdit;
