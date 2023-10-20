import  "./karyawanform.css"
import FormPages from "../../../components/Content/FormPages/FormPages"
import { useState } from "react";

const MasterDataKaryawanForm = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    const handleChildren = () => {
        setIsEnabled(!isEnabled);
    }

    return <div className="karyawanform__container">
        <div className="content__container">
            <FormPages formTitle="Add Karyawan" to="/master-data/karyawan-view" showDataProfile={true} showDataKaryawan={true} showTambahFoto={true} showDataAlamat={true} showChildrenProfile={isEnabled} onClick={handleChildren}/>
        </div>
    </div>
}

export default MasterDataKaryawanForm