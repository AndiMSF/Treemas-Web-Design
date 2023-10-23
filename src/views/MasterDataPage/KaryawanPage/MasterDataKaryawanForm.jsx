import  "./karyawanform.css"
import FormPages from "../../../components/Content/FormPages/FormPages"
import { useState } from "react";

const MasterDataKaryawanForm = () => {
    const [isEnabledProfile, setIsEnabledProfile] = useState(false);
    const [isEnabledFoto, setIsEnabledFoto] = useState(false);
    const [isEnabledKaryawan, setIsEnabledKaryawan] = useState(false);
    const [isEnabledAlamat, setIsEnabledAlamat] = useState(false);
    const [isEnabledLain, setIsEnabledLain] = useState(false);

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
        <div className="content__container">
            <FormPages formTitle="Add Karyawan" to="/master-data/karyawan-view" showDataProfile={true} showDataKaryawan={true} showTambahFoto={true} showDataAlamat={true} showDataLain={true} showChildrenFoto={isEnabledFoto} showChildrenProfile={isEnabledProfile} showChildrenAlamat={isEnabledAlamat} showChildrenKaryawan={isEnabledKaryawan} showChildrenLain={isEnabledLain} onClickFoto={handleChildrenFoto} onClickProfile={handleChildrenProfile} onClickAlamat={handleChildrenAlamat} onClickKaryawan={handleChildrenKaryawan} onClickLain={handleChildrenLain}/>
        </div>
    </div>
}

export default MasterDataKaryawanForm