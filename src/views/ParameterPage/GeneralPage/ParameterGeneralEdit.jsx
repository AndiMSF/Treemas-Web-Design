/* eslint-disable no-unused-vars */
import "./generaledit.css";
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

const ParameterGeneralEdit = () => {
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
        id: formData.id,
        paramDesc: formData.paramDesc,
        dataType: formData.dataType,
        val: formData.val,
      };

      const response = await axios.put(
        `http://localhost:8081/api/parameter/general-form/edit/${id}`,
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
        text: "General Updated.",
        icon: "success",
      });
      navigate("/parameter/general-view");
      console.log("Response from API:", response.data);
    } catch (error) {
      // Jika tidak berhasil, tampilkan pesan error
      console.error("Failed to fetch data:");
      Swal.fire({
        title: "Error!",
        text: "Failed to update general.",
        icon: "error",
      });
    }
  };

  const {
    state: { selectedGeneral },
  } = useLocation();
  const initialFormData = selectedGeneral || {
    id: "",
    paramDesc: "",
    dataType: "",
    val: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  return (
    <div className="content__container">
      <div className="form__container">
        <div className="form__container__top">
          <h1>General Edit</h1>
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
                value={formData.id}
                onChange={(e) => handleInputChange(e, "id")}
              />
            </div>
          </div>

          <div className="form__row">
            <div className="form__row__left">
              <p>
                Tipe Data <span style={{ color: "red" }}>*</span>
              </p>
            </div>
            <div className="form__row__right__label">
              {["checkbox "].map((type) => (
                <div key={`Character`}>
                  <Form.Check
                    type={type}
                    id={`Character`}
                    label={`Character`}
                  />
                </div>
              ))}

              {["checkbox"].map((type) => (
                <div key={`Numeric`}>
                  <Form.Check type={type} id={`Numeric`} label={`Numeric`} />
                </div>
              ))}
            </div>
          </div>

          <div className="form__row">
            <div className="form__row__left">
              <p>Value</p>
            </div>
            <div className="form__row__right">
              <BoxInput
                placeholder="Value"
                value={formData.val}
                onChange={(e) => handleInputChange(e, "val")}
              />
            </div>
          </div>

          <div className="form__row">
            <div className="form__row__left">
              <p>Keterangan</p>
            </div>
            <div className="form__row__right">
              <TextArea
                placeholder="Keterangan"
                value={formData.paramDesc}
                onChange={(e) => handleInputChange(e, "paramDesc")}
              />
            </div>
          </div>

          <div className="form__row__bottom">
            <Link
              to="/parameter/general-view"
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

export default ParameterGeneralEdit;
