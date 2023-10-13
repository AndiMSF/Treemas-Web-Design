import "./claimform.css"
import FormPages from "../../../components/Content/FormPages/FormPages";

const MasterDataClaimForm = () => {
    const boxInput = ["ID", "Nominal"]
    const textArea = ["Keterangan"]
    return <div className="claimform__container">
        <div className="content__container">
            <FormPages formTitle="Claim Form" boxInput={boxInput} textArea={textArea} showUpload={false} />
        </div>
    </div>     
}

export default MasterDataClaimForm