import "./cutiform.css"
import FormPages from "../../../components/Content/FormPages/FormPages"

const MasterDataCutiForm = () => {
    const boxInput = ["ID", "Jumlah"]
    const textArea = ["Keterangan"]

    return <div className="cutiform__container">
         <div className="content__container">
            <FormPages formTitle="Form Cuti" boxInput={boxInput} textArea={textArea} to="/master-data/cuti-view" showUpload={false} />
        </div>
    </div>
}

export default MasterDataCutiForm