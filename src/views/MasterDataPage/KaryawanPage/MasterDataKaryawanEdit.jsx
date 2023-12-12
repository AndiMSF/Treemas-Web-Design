/* eslint-disable no-unused-vars */
import "./karyawanedit.css"
import FormPages from "../../../components/Content/FormPages/FormPages"
import { useState } from "react";
import { useParams } from "react-router-dom";

const MasterDataKaryawanEdit = () => {
    const { id } = useParams();
    const [isEnabledProfile, setIsEnabledProfile] = useState(false);
    const [isEnabledFoto, setIsEnabledFoto] = useState(false);
    const [isEnabledKaryawan, setIsEnabledKaryawan] = useState(false);
    const [isEnabledAlamat, setIsEnabledAlamat] = useState(false);
    const [isEnabledLain, setIsEnabledLain] = useState(false);
    const [api, setApi] = useState(`https://treemas-api-405402.et.r.appspot.com/api/master-data/karyawan-form/edit/${id}`);
    const [isKaryawanForm, setIsKaryawanForm] = useState(true);

    const handleChildrenProfile = () => {
        setIsEnabledProfile(!isEnabledProfile);
    }

    const handleChildrenFoto = () => {
        setIsEnabledFoto(!isEnabledFoto);
    }

    const handleChildrenKaryawan = () => {
        setIsEnabledKaryawan(!isEnabledKaryawan);
    }

    const handleChildrenAlamat = () => {
        setIsEnabledAlamat(!isEnabledAlamat);
    }

    const handleChildrenLain = () => {
        setIsEnabledLain(!isEnabledLain)
    }


    return <div className="karyawanform__container">
            <FormPages formTitle="Edit Karyawan" to="/master-data/karyawan-view" isKaryawanForm={isKaryawanForm} showDataProfile={true} showDataKaryawan={true} showTambahFoto={true} showDataAlamat={true} showDataLain={true} showChildrenFoto={isEnabledFoto} showChildrenProfile={isEnabledProfile} showChildrenAlamat={isEnabledAlamat} showChildrenKaryawan={isEnabledKaryawan} showChildrenLain={isEnabledLain} onClickFoto={handleChildrenFoto} onClickProfile={handleChildrenProfile} onClickAlamat={handleChildrenAlamat} onClickKaryawan={handleChildrenKaryawan} onClickLain={handleChildrenLain} api={api}/>
    </div>
}

export default MasterDataKaryawanEdit