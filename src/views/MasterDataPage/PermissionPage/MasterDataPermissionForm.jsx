import "./permissionform.css"
import FormPages from "../../../components/Content/FormPages/FormPages"

const MasterDataPermissionForm = () => {
    const boxInput = ["Nama Permission"]

    return <div className="permissionform__container">
        <div className="content__container">
            <FormPages formTitle="Form Permission" boxInput={boxInput} to="/master-data/permission-view" showUpload={false}/>
        </div>
    </div>
}

export default MasterDataPermissionForm