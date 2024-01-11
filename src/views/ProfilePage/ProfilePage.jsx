/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import "./profilepage.css";
import { useState } from "react";
import FormPages from "../../components/Content/FormPages/FormPages";

const ProfilePage = () => {
  const [isEnabledProfile, setIsEnabledProfile] = useState(false);
  const [isEnabledFoto, setIsEnabledFoto] = useState(false);
  const [isEnabledKaryawan, setIsEnabledKaryawan] = useState(false);
  const [isEnabledAlamat, setIsEnabledAlamat] = useState(false);
  const [isEnabledLain, setIsEnabledLain] = useState(false);
  const [isEnabledPassword, setIsEnabledPassword] = useState(false);
  const [apiProfile, setApiProfile] = useState(
    `http://localhost:8081/api/users/update-profile`
  );
  const [isKaryawanForm, setIsKaryawanForm] = useState(true);
  const [isProfile, setIsProfile] = useState(true);

  const handleChildrenProfile = () => {
    setIsEnabledProfile(!isEnabledProfile);
  };

  const handleChildrenFoto = () => {
    setIsEnabledFoto(!isEnabledFoto);
  };

  const handleChildrenKaryawan = () => {
    setIsEnabledKaryawan(!isEnabledKaryawan);
  };

  const handleChildrenAlamat = () => {
    setIsEnabledAlamat(!isEnabledAlamat);
  };

  const handleChildrenLain = () => {
    setIsEnabledLain(!isEnabledLain);
  };

  const handleChildrenPassword = () => {
    setIsEnabledPassword(!isEnabledPassword);
  };

  return (
    <div className="karyawanform__container">
      <FormPages
        formTitle="Edit Profile"
        to="/master-data/karyawan-view"
        isProfile={isProfile}
        showDataProfile={true}
        showDataKaryawan={true}
        showTambahFoto={true}
        showDataAlamat={true}
        showDataLain={true}
        showPassword={true}
        showChildrenFoto={isEnabledFoto}
        showChildrenProfile={isEnabledProfile}
        showChildrenAlamat={isEnabledAlamat}
        showChildrenKaryawan={isEnabledKaryawan}
        showChildrenLain={isEnabledLain}
        showChildrenPassword={isEnabledPassword}
        onClickFoto={handleChildrenFoto}
        onClickProfile={handleChildrenProfile}
        onClickAlamat={handleChildrenAlamat}
        onClickKaryawan={handleChildrenKaryawan}
        onClickLain={handleChildrenLain}
        onClickPassword={handleChildrenPassword}
        apiProfile={apiProfile}
      />
    </div>
  );
};

export default ProfilePage;
