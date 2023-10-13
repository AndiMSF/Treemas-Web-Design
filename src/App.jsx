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
import MasterDataClaim from './views/MasterDataPage/ClaimPage/MasterDataClaim'
import MasterDataClaimForm from './views/MasterDataPage/ClaimPage/MasterDataClaimForm'
import MasterDataCuti from './views/MasterDataPage/CutiPage/MasterDataCuti'
import MasterDataCutiForm from './views/MasterDataPage/CutiPage/MasterDataCutiForm'
import MasterDataJabatan from './views/MasterDataPage/JabatanPage/MasterDataJabatan'
import MasterDataJabatanForm from './views/MasterDataPage/JabatanPage/MasterDataJabatanForm'
import MasterDataKaryawan from './views/MasterDataPage/KaryawanPage/MasterDataKaryawan'
import MasterDataKaryawanForm from './views/MasterDataPage/KaryawanPage/MasterDataKaryawanForm'
import MasterDataLibur from './views/MasterDataPage/LiburPage/MasterDataLibur'
import MasterDataLiburForm from './views/MasterDataPage/LiburPage/MasterDataLiburForm'
import MasterDataPermission from './views/MasterDataPage/PermissionPage/MasterDataPermission'
import MasterDataPermissionForm from './views/MasterDataPage/PermissionPage/MasterDataPermissionForm'
import MasterDataProject from './views/MasterDataPage/ProjectPage/MasterDataProject'
import MasterDataProjectForm from './views/MasterDataPage/ProjectPage/MasterDataProjectForm'
import ParameterGeneral from './views/ParameterPage/GeneralPage/ParameterGeneral'
import ParameterGeneralForm from './views/ParameterPage/GeneralPage/ParameterGeneralForm'
import ParameterReimburse from './views/ParameterPage/ReimbursePage/ParameterReimburse'
import ParameterReimburseForm from './views/ParameterPage/ReimbursePage/ParameterReimburseForm'
import ReportDataClaim from './views/ReportDataPage/ClaimPage/ReportDataClaim'
import ReportDataDetail from './views/ReportDataPage/DetailPage/ReportDataDetail'
import ReportDataSummary from './views/ReportDataPage/SummaryPage/ReportDataSummary'
import UploadAbsen from './views/UploadPage/AbsenPage/UploadAbsen'
import UploadApk from './views/UploadPage/ApkPage/UploadApk'
// 
import "./App.css"
import { useEffect, useState } from "react"

function App() {
  const [isPath, setIsPath] = useState("")

  useEffect(() => {
    const currentPath = window.location.pathname;
    setIsPath(currentPath)
    console.log(isPath);
  }, [setIsPath, isPath])


  return (
    <>
    <BrowserRouter >
    

      {isPath === '/login' || isPath === '/logout' ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LoginPage />} />
        </Routes>
      ):(
        <Sidebar>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detail-data/absen-view" element={<DetaildataAbsen />} />
          <Route path="/detail-data/cutisakit-view" element={<DetaildataCutiSakit />} />
          <Route path="/detail-data/reimburse-view" element={<DetaildataReimburse />} />
          <Route path="/detail-data/timesheet-view" element={<DetaildataTimesheet />} />
          <Route path="/detail-data/tracking-view" element={<DetaildataTracking />} />
          <Route path="/management/user-view" element={<ManagementUser />} />
          <Route path="/management/user-access-view" element={<ManagementUserAccess />} />
          <Route path="/management/user-member-view" element={<ManagementUserMember />} />
          <Route path="/manual-service" element={<ManualService />} />
          <Route path="/master-data/announcement-view" element={<MasterDataAnnouncement />} />
          <Route path="/master-data/announcement-form/add" element={<MasterDataAnnouncementForm />} />
          <Route path="/master-data/claim-view" element={<MasterDataClaim />} />
          <Route path="/master-data/claim-form/add" element={<MasterDataClaimForm />} />
          <Route path="/master-data/cuti-view" element={<MasterDataCuti />} />
          <Route path="/master-data/cuti-form/add" element={<MasterDataCutiForm />} />
          <Route path="/master-data/jabatan-view" element={<MasterDataJabatan />} />
          <Route path="/master-data/jabatan-form/add" element={<MasterDataJabatanForm />} />
          <Route path="/master-data/karyawan-view" element={<MasterDataKaryawan />} />
          <Route path="/master-data/karyawan-form/add" element={<MasterDataKaryawanForm />} />
          <Route path="/master-data/libur-view" element={<MasterDataLibur />} />
          <Route path="/master-data/libur-form/add" element={<MasterDataLiburForm />} />
          <Route path="/master-data/permission-view" element={<MasterDataPermission />} />
          <Route path="/master-data/permission-form/add" element={<MasterDataPermissionForm />} />
          <Route path="/master-data/project-view" element={<MasterDataProject/>} />
          <Route path="/master-data/project-form/add" element={<MasterDataProjectForm />} />
          <Route path="/parameter/general-view" element={<ParameterGeneral />} />
          <Route path="/parameter/general-form/edit" element={<ParameterGeneralForm />} />
          <Route path="/parameter/reimburse-view" element={<ParameterReimburse />} />
          <Route path="/parameter/reimburse-form/edit" element={<ParameterReimburseForm />} />
          <Route path="/ReportData/claim" element={<ReportDataClaim />} />
          <Route path="/ReportData/detail" element={<ReportDataDetail />} />
          <Route path="/ReportData/summary" element={<ReportDataSummary />} />
          <Route path="/Upload/absen" element={<UploadAbsen />} />
          <Route path="/Upload/apk" element={<UploadApk />} />
        </Routes>
      </Sidebar>
      )}
      
    </BrowserRouter>
    </>
  )
}

export default App
