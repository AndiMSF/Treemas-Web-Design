import "./jabatanform.css"
import FormPages from "../../../components/Content/FormPages/FormPages"

const MasterDataJabatanForm = () => {
    const boxInput = ["ID","Nama Jabatan"]
    return <div className="jabatanform__container">
        <div className="content__container">
            <FormPages formTitle="Form Jabatan" boxInput={boxInput} to="/master-data/jabatan-view" showUpload={false} />
        </div>
    </div>
}

export default MasterDataJabatanForm