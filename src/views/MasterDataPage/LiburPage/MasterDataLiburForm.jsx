import "./liburform.css"
import FormPages from "../../../components/Content/FormPages/FormPages"

const MasterDataLiburForm = () => {
    const boxInput = ["Tanggal Libur"]
    const textArea = ["Keterangan"]

    return <div className="liburform__container">
        <div className="content__container">
            <FormPages formTitle="Form Libur" boxInput={boxInput} textArea={textArea} to="/master-data/libur-view" showUpload={false}/>
        </div>
    </div>
}

export default MasterDataLiburForm