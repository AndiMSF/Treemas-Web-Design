import "./projectform.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataProjectForm = () => {
    return <div className="projectform__container">
        <Sidebar/>
        <Content navbarText="Master Data / Project Form" informationText="Project Add"/>
    </div>
}

export default MasterDataProjectForm