/* eslint-disable no-unused-vars */
import "./reimburseedit.css";
import BoxInput from "../../../components/Elements/BoxInput/BoxInput";
import TextArea from "../../../components/Elements/TextArea/TextArea";
import Button from "../../../components/Elements/Buttons/Button";
import axios from "axios";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom/dist";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";

const ParameterReimburseEdit = () => {
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
        reimburseId: formData.reimburseId,
        nama: formData.nama,
        nominal: formData.nominal,
        note: formData.note,
      };

      const response = await axios.put(
        `http://localhost:8081/api/parameter/reimburse-form/edit/${id}`,
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
        text: "Reimburse Updated.",
        icon: "success",
      });
      navigate("/parameter/reimburse-view");
      console.log("Response from API:", response.data);
    } catch (error) {
      // Jika tidak berhasil, tampilkan pesan error
      console.error("Failed to fetch data:");
      Swal.fire({
        title: "Error!",
        text: "Failed to update reimburse.",
        icon: "error",
      });
    }
  };

  const {
    state: { selectedReimburse },
  } = useLocation();
  const initialFormData = selectedReimburse || {
    reimburseId: "",
    nama: "",
    nominal: "",
    note: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  return (
    <div className="content__container">
      <div className="form__container">
        <div className="form__container__top">
          <h1>Reimburse Edit</h1>
          <div className="horizontal__line"></div>
        </div>
        <form>
          <div className="form__row">
            <div className="form__row__left">
              <p>
                ID <span style={{ color: "red" }}>*</span>
              </p>
            </div>
            <div className="form__row__right">
              <BoxInput
                placeholder="ID"
                value={formData.reimburseId}
                onChange={(e) => handleInputChange(e, "reimburseId")}
              />
            </div>
          </div>
          <div className="form__row">
            <div className="form__row__left">
              <p>Nama Reimburse</p>
            </div>
            <div className="form__row__right">
              <BoxInput
                placeholder="Value"
                value={formData.nama}
                onChange={(e) => handleInputChange(e, "nama")}
              />
            </div>
          </div>
          <div className="form__row">
            <div className="form__row__left">
              <p>Nominal</p>
            </div>
            <div className="form__row__right">
              <BoxInput
                placeholder="Nominal"
                value={formData.nominal}
                onChange={(e) => handleInputChange(e, "nominal")}
              />
            </div>
          </div>
          <div className="form__row">
            <div className="form__row__left">
              <p>Note</p>
            </div>
            <div className="form__row__right">
              <TextArea
                placeholder="Note"
                value={formData.note}
                onChange={(e) => handleInputChange(e, "note")}
              />
            </div>
          </div>

          <div className="form__row__bottom">
            <Link
              to="/parameter/reimburse-view"
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

export default ParameterReimburseEdit;
