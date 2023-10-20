import  "./karyawanform.css"
import FormPages from "../../../components/Content/FormPages/FormPages"

const MasterDataKaryawanForm = () => {

    return <div className="karyawanform__container">
        <div className="content__container">
            <FormPages formTitle="Add Karyawan" to="/master-data/karyawan-view" showDataProfile={true} showDataKaryawan={true} showTambahFoto={true} showDataAlamat={true}/>
        </div>
    </div>
}

export default MasterDataKaryawanForm