import './profilepage.css'
import FormPages from '../../components/Content/FormPages/FormPages';

const ProfilePage = () => {
    const boxInput = ["Title", "Header", "Footer"]
    const textArea = ["Body"]
    const image = ["Gambar"]
  return <div className="profilepage__container">
      <div className="content__container">
            <FormPages formTitle="Profile Page" boxInput={boxInput} textArea={textArea} image={image} to="/users-profile" showUpload={true} />
        </div>
    </div>
};

export default ProfilePage
