import  "./karyawanform.css"
import FormPages from "../../../components/Content/FormPages/FormPages"
import { useState } from "react";

const MasterDataKaryawanForm = () => {
    const [isEnabledProfile, setIsEnabledProfile] = useState(false);
    const [isEnabledFoto, setIsEnabledFoto] = useState(false);
    const [isEnabledKaryawan, setIsEnabledKaryawan] = useState(false);
    const [isEnabledAlamat, setIsEnabledAlamat] = useState(false);

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


    return <div className="karyawanform__container">
        <div className="content__container">
            <FormPages formTitle="Add Karyawan" to="/master-data/karyawan-view" showDataProfile={true} showDataKaryawan={true} showTambahFoto={true} showDataAlamat={true} showChildrenFoto={isEnabledFoto} showChildrenProfile={isEnabledProfile} showChildrenAlamat={isEnabledAlamat} showChildrenKaryawan={isEnabledKaryawan} onClickFoto={handleChildrenFoto} onClickProfile={handleChildrenProfile} onClickAlamat={handleChildrenAlamat} onClickKaryawan={handleChildrenKaryawan}/>
        </div>
    </div>
}

export default MasterDataKaryawanForm