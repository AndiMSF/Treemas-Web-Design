import './profilepage.css'
import FormPages from '../../components/Content/FormPages/FormPages';
import { useState } from 'react';

const ProfilePage = () => { 
    const [isEnabledProfile, setIsEnabledProfile] = useState(false);
    const [isEnabledFoto, setIsEnabledFoto] = useState(false);
    const [isEnabledKaryawan, setIsEnabledKaryawan] = useState(false);
    const [isEnabledAlamat, setIsEnabledAlamat] = useState(false);
    const [isEnabledLain, setIsEnabledLain] = useState(false);
    const [isEnabledPassword, setIsEnabledPassword] = useState(false);

    const handleChildrenProfile = () => {
        setIsEnabledProfile(!isEnabledProfile);
    }

    const handleChildrenFoto = () => {
        setIsEnabledFoto(!isEnabledFoto);
    }

    const handleChildrenKaryawan = () => {
        setIsEnabledKaryawan(!isEnabledKaryawan);
    }

    const handleChildrenAlamat = () => {
        setIsEnabledAlamat(!isEnabledAlamat);
    }

    const handleChildrenLain = () => {
        setIsEnabledLain(!isEnabledLain);
    }

    const handleChildrenPassword = () => {
        setIsEnabledPassword(!isEnabledPassword);
    }

    return <div className="profilepage__container">
        <div className="content__container">
            <FormPages formTitle="Profile Page" to="/dashboard" showDataProfile={true} showDataKaryawan={true} showTambahFoto={true} showDataAlamat={true} showDataLain={true} showChildrenFoto={isEnabledFoto} showPassword={true} showChildrenProfile={isEnabledProfile} showChildrenAlamat={isEnabledAlamat} showChildrenKaryawan={isEnabledKaryawan} showChildrenLain={isEnabledLain} showChildrenPassword={isEnabledPassword} onClickFoto={handleChildrenFoto} onClickProfile={handleChildrenProfile} onClickAlamat={handleChildrenAlamat} onClickKaryawan={handleChildrenKaryawan} onClickLain={handleChildrenLain} onClickPassword={handleChildrenPassword}/>
        </div>
    </div>
}

export default ProfilePage
