import { useState } from 'react'; // Import useState
import FormPages from '../../../components/Content/FormPages/FormPages';
import './announcementform.css';

const MasterDataAnnouncementForm = () => {
  const [formData, setFormData] = useState({
    Title: '',
    Header: '',
    Footer: '',
    Body: '',
    Gambar: null, // You can use null or an initial value, depending on your requirements.
  });

  // Handler untuk mengelola perubahan input
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Handler untuk mengirim formulir
  const handleSubmit = (e) => {
    e.preventDefault();

    // Di sini Anda dapat mengirim data formulir ke server atau melakukan tindakan lain.
    console.log('Data yang akan dikirim:', formData);
  };

  const boxInput = ['Title', 'Header', 'Footer'];
  const textArea = ['Body'];
  const image = ['Gambar'];

  return (
    <div className="announcementform__container">
      <div className="content__container">
        {/* Tambahkan elemen <form> dan atribut onSubmit */}
        <form onSubmit={handleSubmit}>
          <FormPages
            formTitle="Announcement Form"
            boxInput={boxInput}
            textArea={textArea}
            image={image}
            to="/master-data/announcement-view"
            showUpload={true}
            // Pass value and onChange props to input components
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
};

export default MasterDataAnnouncementForm;
