import FormPages from "../../../components/Content/FormPages/FormPages";
import "./announcementform.css";

const MasterDataAnnouncementForm = () => {
    const boxInput = ["Title", "Header", "Footer"]
    const textArea = ["Body"]
    const image = ["Gambar"]
  return <div className="announcementform__container">
      <div className="content__container">
            <FormPages formTitle="Announcement Form" boxInput={boxInput} textArea={textArea} image={image} to="/master-data/announcement-view" showUpload={true} />
        </div>
    </div>
};

export default MasterDataAnnouncementForm;
