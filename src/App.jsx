/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Sidebar from "./components/Sidebar/Sidebar"


// Views
import LoginPage from './views/LoginPage/LoginPage'
import Dashboard from './views/DashboardPage/Dashboard'
import DetaildataAbsen from "./views/DetaildataPage/AbsenPage/DetaildataAbsen"
import DetaildataCutiSakit from './views/DetaildataPage/CutisakitPage/DetaildataCutiSakit'
import DetaildataReimburse from './views/DetaildataPage/ReimbursePage/DetaildataReimburse'
import DetaildataTimesheet from './views/DetaildataPage/TimesheetPage/DetaildataTimesheet'
import DetaildataTracking from './views/DetaildataPage/TrackingPage/DetaildataTracking'
import ManagementUser from './views/ManagementPage/UserPage/ManagementUser'
import ManagementUserAccess from './views/ManagementPage/UserAccessPage/ManagementUserAccess'
import ManagementUserMember from './views/ManagementPage/UserMember/ManagementUserMember' 
import ManualService from './views/ManualServicePage/ManualService'
import MasterDataAnnouncement from './views/MasterDataPage/AnnouncementPage/MasterDataAnnouncement'
import MasterDataAnnouncementForm from './views/MasterDataPage/AnnouncementPage/MasterDataAnnouncementForm'
import MasterDataAnnouncementEdit from './views/MasterDataPage/AnnouncementPage/MasterDataAnnouncementEdit'
import MasterDataClaim from './views/MasterDataPage/ClaimPage/MasterDataClaim'
import MasterDataClaimForm from './views/MasterDataPage/ClaimPage/MasterDataClaimForm'
import MasterDataClaimEdit from "./views/MasterDataPage/ClaimPage/MasterDataClaimEdit"
import MasterDataCuti from './views/MasterDataPage/CutiPage/MasterDataCuti'
import MasterDataCutiForm from './views/MasterDataPage/CutiPage/MasterDataCutiForm'
import MasterDataCutiEdit from './views/MasterDataPage/CutiPage/MasterDataCutiEdit'
import MasterDataJabatan from './views/MasterDataPage/JabatanPage/MasterDataJabatan'
import MasterDataJabatanForm from './views/MasterDataPage/JabatanPage/MasterDataJabatanForm'
import MasterDataJabatanEdit from './views/MasterDataPage/JabatanPage/MasterDataJabatanEdit'
import MasterDataKaryawan from './views/MasterDataPage/KaryawanPage/MasterDataKaryawan'
import MasterDataKaryawanEdit from './views/MasterDataPage/KaryawanPage/MasterDataKaryawanEdit'
import MasterDataKaryawanForm from './views/MasterDataPage/KaryawanPage/MasterDataKaryawanForm'
import MasterDataLibur from './views/MasterDataPage/LiburPage/MasterDataLibur'
import MasterDataLiburForm from './views/MasterDataPage/LiburPage/MasterDataLiburForm'
import MasterDataLiburEdit from './views/MasterDataPage/LiburPage/MasterDataLiburEdit'
import MasterDataPermission from './views/MasterDataPage/PermissionPage/MasterDataPermission'
import MasterDataPermissionForm from './views/MasterDataPage/PermissionPage/MasterDataPermissionForm'
import MasterDataPermissionEdit from './views/MasterDataPage/PermissionPage/MasterDataPermissionEdit'
import MasterDataProject from './views/MasterDataPage/ProjectPage/MasterDataProject'
import MasterDataProjectForm from './views/MasterDataPage/ProjectPage/MasterDataProjectForm'
import MasterDataProjectEdit from "./views/MasterDataPage/ProjectPage/MasterDataProjectEdit"
import ParameterGeneral from './views/ParameterPage/GeneralPage/ParameterGeneral'
import ParameterGeneralEdit from './views/ParameterPage/GeneralPage/ParameterGeneralEdit'
import ParameterReimburse from './views/ParameterPage/ReimbursePage/ParameterReimburse'
import ParameterReimburseEdit from './views/ParameterPage/ReimbursePage/ParameterReimburseEdit'
import ReportDataClaim from './views/ReportDataPage/ClaimPage/ReportDataClaim'
import ReportDataDetail from './views/ReportDataPage/DetailPage/ReportDataDetail'
import ReportDataSummary from './views/ReportDataPage/SummaryPage/ReportDataSummary'
import UploadAbsen from './views/UploadPage/AbsenPage/UploadAbsen'
import UploadApk from './views/UploadPage/ApkPage/UploadApk'
import ProfilePage from "./views/ProfilePage/ProfilePage"
import ChangePassword from "./views/ChangePassword/ChangePassword"
import ForgotPass from "./views/LoginPage/ForgetPass"
// 
import "./App.css"
import { useEffect } from "react"

function App() {

  // useEffect(() => {
  //   let inactivityTimeout;

  //   // Fungsi untuk menghapus token
  //   const removeToken = () => {
  //     localStorage.removeItem('authToken');
  //     console.log('Token dihapus karena tidak ada aktivitas.');
  //   };

  //   // Fungsi untuk mereset timeout jika ada aktivitas
  //   const resetInactivityTimeout = () => {
  //     clearTimeout(inactivityTimeout);
  //     inactivityTimeout = setTimeout(removeToken, 1 * 60 * 1000); // Atur timeout ke 10 menit (dalam milidetik)
  //   };

  //   // Event listener untuk mendeteksi gerakan mouse
  //   document.addEventListener('mousemove', resetInactivityTimeout);

  //   // Event listener untuk mendeteksi klik
  //   document.addEventListener('click', resetInactivityTimeout);

  //   // Event listener untuk mendeteksi aktivitas keyboard
  //   document.addEventListener('keydown', resetInactivityTimeout);

  //   // Membersihkan event listener ketika komponen di-unmount
  //   return () => {
  //     document.removeEventListener('mousemove', resetInactivityTimeout);
  //     document.removeEventListener('click', resetInactivityTimeout);
  //     document.removeEventListener('keydown', resetInactivityTimeout);
  //   };
  // }, []); // Dependensi kosong agar useEffect dijalankan sekali saat komponen di-mount





    // Set interval untuk is locked agar hit berkali kali biar selalu check isLock ke local storage

  return (
    <>
    <BrowserRouter >
       
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/change-password" element={<ChangePassword/>}/>
          <Route path="/forgot-password" element={<ForgotPass/>} />
          <Route path="/" element= {<Sidebar> {<Dashboard />} </Sidebar> }/>
          <Route path="/dashboard" element= {<Sidebar> {<Dashboard />} </Sidebar> }/>
          <Route path="/detail-data/absen-view" element= {<Sidebar> {<DetaildataAbsen />} </Sidebar> }/>
          <Route path="/detail-data/cutisakit-view" element={<Sidebar>{<DetaildataCutiSakit />}</Sidebar>} />
          <Route path="/detail-data/reimburse-view" element={<Sidebar>{<DetaildataReimburse />}</Sidebar>} />
          <Route path="/detail-data/timesheet-view" element={<Sidebar>{<DetaildataTimesheet />}</Sidebar>} />
          <Route path="/detail-data/tracking-view" element={<Sidebar>{<DetaildataTracking />}</Sidebar>} />
          <Route path="/management/user-view" element={<Sidebar>{<ManagementUser />}</Sidebar>} />
          <Route path="/management/user-access-view" element={<Sidebar>{<ManagementUserAccess />}</Sidebar>} />
          <Route path="/management/user-member-view" element={<Sidebar>{<ManagementUserMember />}</Sidebar>} />
          <Route path="/manual-service" element={<Sidebar>{<ManualService />}</Sidebar>} />
          <Route path="/master-data/announcement-view" element={<Sidebar>{<MasterDataAnnouncement />}</Sidebar>} />
          <Route path="/master-data/announcement-form/add" element={<Sidebar>{<MasterDataAnnouncementForm />}</Sidebar>} />
          <Route path="/master-data/announcement-edit/:id" element={<Sidebar>{<MasterDataAnnouncementEdit />}</Sidebar>} />
          <Route path="/master-data/claim-view" element={<Sidebar>{<MasterDataClaim />}</Sidebar>} />
          <Route path="/master-data/claim-form/add" element={<Sidebar>{<MasterDataClaimForm />}</Sidebar>} />
          <Route path="/master-data/claim-edit/:id" element={<Sidebar>{<MasterDataClaimEdit />}</Sidebar>} />
          <Route path="/master-data/cuti-view" element={<Sidebar>{<MasterDataCuti />}</Sidebar>} />
          <Route path="/master-data/cuti-form/add" element={<Sidebar>{<MasterDataCutiForm />}</Sidebar>} />
          <Route path="/master-data/cuti-edit/:id" element={<Sidebar>{<MasterDataCutiEdit />}</Sidebar>} />
          <Route path="/master-data/jabatan-view" element={<Sidebar>{<MasterDataJabatan />}</Sidebar>} />
          <Route path="/master-data/jabatan-form/add" element={<Sidebar>{<MasterDataJabatanForm />}</Sidebar>} />
          <Route path="/master-data/jabatan-edit/:id" element={<Sidebar>{<MasterDataJabatanEdit />}</Sidebar>} />
          <Route path="/master-data/karyawan-view" element={<Sidebar>{<MasterDataKaryawan />}</Sidebar>} />
          <Route path="/master-data/karyawan-form/edit/:id" element={<Sidebar>{<MasterDataKaryawanEdit />}</Sidebar>} />
          <Route path="/master-data/karyawan-form/add" element={<Sidebar>{<MasterDataKaryawanForm />}</Sidebar>} />
          <Route path="/master-data/libur-view" element={<Sidebar>{<MasterDataLibur />}</Sidebar>} />
          <Route path="/master-data/libur-form/add" element={<Sidebar>{<MasterDataLiburForm />}</Sidebar>} />
          <Route path="/master-data/libur-edit/:id" element={<Sidebar>{<MasterDataLiburEdit />}</Sidebar>} />
          <Route path="/master-data/permission-view" element={<Sidebar>{<MasterDataPermission />}</Sidebar>} />
          <Route path="/master-data/permission-form/add" element={<Sidebar>{<MasterDataPermissionForm />}</Sidebar>} />
          <Route path="/master-data/permission-edit/:id" element={<Sidebar>{<MasterDataPermissionEdit />}</Sidebar>} />
          <Route path="/master-data/project-view" element={<Sidebar>{<MasterDataProject />}</Sidebar>} />
          <Route path="/master-data/project-form/add" element={<Sidebar>{<MasterDataProjectForm />}</Sidebar>} />
          <Route path="/master-data/project-form/edit/:id" element={<Sidebar>{<MasterDataProjectEdit />}</Sidebar>} />
          <Route path="/parameter/general-view" element={<Sidebar>{<ParameterGeneral />}</Sidebar>} />
          <Route path="/parameter/general-form/edit/:id" element={<Sidebar>{<ParameterGeneralEdit />}</Sidebar>} />
          <Route path="/parameter/reimburse-view" element={<Sidebar>{<ParameterReimburse />}</Sidebar>} />
          <Route path="/parameter/reimburse-form/edit/:id" element={<Sidebar>{<ParameterReimburseEdit />}</Sidebar>} />
          <Route path="/report-data/claim" element={<Sidebar>{<ReportDataClaim />}</Sidebar>} />
          <Route path="/report-data/detail" element={<Sidebar>{<ReportDataDetail />}</Sidebar>} />
          <Route path="/report-data/summary" element={<Sidebar>{<ReportDataSummary />}</Sidebar>} />
          <Route path="/upload/absen" element={<Sidebar>{<UploadAbsen />}</Sidebar>} />
          <Route path="/upload/apk" element={<Sidebar>{<UploadApk />}</Sidebar>} />
          <Route path="/users/profile" element={<Sidebar>{<ProfilePage />}</Sidebar>} />          
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
