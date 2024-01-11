/* eslint-disable no-unused-vars */
import "./apk.css";
import Navbar from "../../../components/Content/Navbar/Navbar";
import Button from "../../../components/Elements/Buttons/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

const UploadApk = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check local storage for the loading state when the component mounts
  useEffect(() => {
    const storedLoadingState = localStorage.getItem("loadingState");
    if (storedLoadingState) {
      setLoading(JSON.parse(storedLoadingState));
    }
  }, []);

  // Save the loading state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("loadingState", JSON.stringify(loading));
  }, [loading]);

  const handleFileChange = (e) => {
    // Handle the file selection
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    // Show loading animation
    setLoading(true);

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://192.168.2.55:8081/api/upload/apk",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success message
      Swal.fire({
        title: "Success!",
        text: "Apk Uploaded",
        icon: "success",
      });
      // Hide loading animation on success
      setLoading(false);
      console.log("Response from API:", response.data);
    } catch (error) {
      // Close the loading animation
      Swal.close();

      // If not successful, show error message
      console.error("Failed to fetch data:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed To Upload Apk",
        icon: "error",
      });
    }
  };

  return (
    <div className="content__container">
      <Navbar navbarText="Upload / Apk" />
      {loading && (
        <div className="loading-overlay">
          <HashLoader loading={loading} size={90} color="#d6e0de" />
        </div>
      )}
      <div className="form__container__apk">
        <div className="form__container__top__apk">
          <h1>Upload Apk</h1>
          <div className="horizontal__line"></div>
        </div>

        <form>
          <div className="form__row">
            <div className="form__row__left">
              <p>File .apk</p>
            </div>

            <div className="form__row__right">
              <Form.Group controlId="formFile">
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
            </div>
          </div>

          <div className="form__row__bottom">
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

export default UploadApk;
