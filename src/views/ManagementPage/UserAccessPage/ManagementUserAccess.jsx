/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./useraccess.css";
import Navbar from "../../../components/Content/Navbar/Navbar";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useNavigate } from "react-router-dom/dist";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Switch
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// SweetAlert
import Swal from "sweetalert2";
import { Dropdown } from "react-bootstrap";

const ManagementUserAccess = () => {
  const navigate = useNavigate();
  const [isToken, setIstoken] = useState("");
  const [dropdownTitle, setDropdownTitle] = useState("Pilih Jabatan");
  const [dropdownData, setDropdownData] = useState([]);

  // Switch states
  const [menuSwitch, setMenuSwitch] = useState(true);
  const [dashboardSwitch, setDashboardSwitch] = useState(true);
  const [detailDataSwitch, setDetailDataSwitch] = useState(true);
  const [absenSwitch, setAbsenSwitch] = useState(true);
  const [cutiSakitSwitch, setCutiSakitSwitch] = useState(true);
  const [reimburseSwitch, setReimburseSwitch] = useState(true);
  const [timesheetSwitch, setTimesheetSwitch] = useState(true);
  const [trackingSwitch, setTrackingSwitch] = useState(true);
  const [managementSwitch, setManagementSwitch] = useState(true);
  const [userSwitch, setUserSwitch] = useState(true);
  const [userAccessSwitch, setUserAccessSwitch] = useState(true);
  const [userMemberSwitch, setUserMemberSwitch] = useState(true);
  const [manualServiceSwitch, setManualServiceSwitch] = useState(true);
  const [masterDataSwitch, setMasterDataSwitch] = useState(true);
  const [announcementSwitch, setAnnouncementSwitch] = useState(true);
  const [claimSwitch, setClaimSwitch] = useState(true);
  const [cutiSwitch, setCutiSwitch] = useState(true);
  const [jabatanSwitch, setJabatanSwitch] = useState(true);
  const [karyawanSwitch, setKaryawanSwitch] = useState(true);
  const [liburSwitch, setLiburSwitch] = useState(true);
  const [permissionSwitch, setPermissionSwitch] = useState(true);
  const [projectSwitch, setProjectSwitch] = useState(true);
  const [parameterSwitch, setParameterSwitch] = useState(true);
  const [generalSwitch, setGeneralSwitch] = useState(true);
  const [reimburseParamSwitch, setReimburseParamSwitch] = useState(true);
  const [reportDataSwitch, setReportDataSwitch] = useState(true);
  const [claimReportSwitch, setClaimReportSwitch] = useState(true);
  const [detailSwitch, setDetailSwitch] = useState(true);
  const [summarySwitch, setSummarySwitch] = useState(true);
  const [uploadSwitch, setUploadSwitch] = useState(true);
  const [absenUploadSwitch, setAbsenUploadSwitch] = useState(true);
  const [apkSwitch, setApkSwitch] = useState(true);

  // Switch change handlers
  const handleMenuSwitchChange = () => {
    setMenuSwitch(!menuSwitch);
  };

  const handleDashboardSwitchChange = () => {
    setDashboardSwitch(!dashboardSwitch);
  };

  const handleDetailDataSwitchChange = () => {
    setDetailDataSwitch(!detailDataSwitch);

    if (detailDataSwitch) {
      setAbsenSwitch(false);
      setCutiSakitSwitch(false);
      setReimburseSwitch(false);
      setTimesheetSwitch(false);
      setTrackingSwitch(false);
    } else {
      setAbsenSwitch(true);
      setCutiSakitSwitch(true);
      setReimburseSwitch(true);
      setTimesheetSwitch(true);
      setTrackingSwitch(true);
    }
  };

  useEffect(() => {
    console.log("DETAIL DATA " + detailDataSwitch);
    console.log("ABSEN " + absenSwitch);
    console.log("REIMBURSE " + reimburseSwitch);
  }, [detailDataSwitch, absenSwitch, reimburseSwitch]);

  const handleAbsenSwitchChange = () => {
    setAbsenSwitch(!absenSwitch);
  };

  const handleCutiSakitSwitchChange = () => {
    setCutiSakitSwitch(!cutiSakitSwitch);
  };

  const handleReimburseSwitchChange = () => {
    setReimburseSwitch(!reimburseSwitch);
  };

  const handleTimesheetSwitchChange = () => {
    setTimesheetSwitch(!timesheetSwitch);
  };

  const handleTrackingSwitchChange = () => {
    setTrackingSwitch(!trackingSwitch);
  };

  const handleManagementSwitchChange = () => {
    setManagementSwitch(!managementSwitch);

    if (managementSwitch) {
      setUserSwitch(false);
      setUserAccessSwitch(false);
      setUserMemberSwitch(false);
    } else {
      setUserSwitch(true);
      setUserAccessSwitch(true);
      setUserMemberSwitch(true);
    }
  };

  const handleUserSwitchChange = () => {
    setUserSwitch(!userSwitch);
  };

  const handleUserAccessSwitchChange = () => {
    setUserAccessSwitch(!userAccessSwitch);
  };

  const handleUserMemberSwitchChange = () => {
    setUserMemberSwitch(!userMemberSwitch);
  };

  const handleManualServiceSwitchChange = () => {
    setManualServiceSwitch(!manualServiceSwitch);
  };

  const handleMasterDataSwitchChange = () => {
    setMasterDataSwitch(!masterDataSwitch);

    if (masterDataSwitch) {
      setAnnouncementSwitch(false);
      setClaimSwitch(false);
      setCutiSwitch(false);
      setJabatanSwitch(false);
      setKaryawanSwitch(false);
      setLiburSwitch(false);
      setPermissionSwitch(false);
      setProjectSwitch(false);
    } else {
      setAnnouncementSwitch(true);
      setClaimSwitch(true);
      setCutiSwitch(true);
      setJabatanSwitch(true);
      setKaryawanSwitch(true);
      setLiburSwitch(true);
      setPermissionSwitch(true);
      setProjectSwitch(true);
    }
  };

  const handleAnnouncementSwitchChange = () => {
    setAnnouncementSwitch(!announcementSwitch);
  };

  const handleClaimSwitchChange = () => {
    setClaimSwitch(!claimSwitch);
  };

  const handleCutiSwitchChange = () => {
    setCutiSwitch(!cutiSwitch);
  };

  const handleJabatanSwitchChange = () => {
    setJabatanSwitch(!jabatanSwitch);
  };

  const handleKaryawanSwitchChange = () => {
    setKaryawanSwitch(!karyawanSwitch);
  };

  const handleLiburSwitchChange = () => {
    setLiburSwitch(!liburSwitch);
  };

  const handlePermissionSwitchChange = () => {
    setPermissionSwitch(!permissionSwitch);
  };

  const handleProjectSwitchChange = () => {
    setProjectSwitch(!projectSwitch);
  };

  const handleParameterSwitchChange = () => {
    setParameterSwitch(!parameterSwitch);

    if (parameterSwitch) {
      setGeneralSwitch(false);
      setReimburseParamSwitch(false);
    } else {
      setGeneralSwitch(true);
      setReimburseParamSwitch(true);
    }
  };

  const handleGeneralSwitchChange = () => {
    setGeneralSwitch(!generalSwitch);
  };

  const handleReimburseParamSwitchChange = () => {
    setReimburseParamSwitch(!reimburseParamSwitch);
  };

  const handleReportDataSwitchChange = () => {
    setReportDataSwitch(!reportDataSwitch);

    if (reportDataSwitch) {
      setClaimReportSwitch(false);
      setDetailSwitch(false);
      setSummarySwitch(false);
    } else {
      setClaimReportSwitch(true);
      setDetailSwitch(true);
      setSummarySwitch(true);
    }
  };

  const handleClaimReportSwitchChange = () => {
    setClaimReportSwitch(!claimReportSwitch);
  };

  const handleDetailSwitchChange = () => {
    setDetailSwitch(!detailSwitch);
  };

  const handleSummarySwitchChange = () => {
    setSummarySwitch(!summarySwitch);
  };

  const handleUploadSwitchChange = () => {
    setUploadSwitch(!uploadSwitch);

    if (uploadSwitch) {
      setAbsenUploadSwitch(false);
      setApkSwitch(false);
    } else {
      setAbsenUploadSwitch(true);
      setApkSwitch(true);
    }
  };

  const handleAbsenUploadSwitchChange = () => {
    setAbsenUploadSwitch(!absenUploadSwitch);
  };

  const handleApkSwitchChange = () => {
    setApkSwitch(!apkSwitch);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/master-data/jabatan-view",
          {
            method: "GET", // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Sertakan token di sini
            },
          }
        );
        const data = await response.json();
        if (data.status === "Success") {
          setDropdownData(data.data);
          console.log(data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      }
    };

    const token = localStorage.getItem("authToken");
    if (token) {
      setIstoken(token);
      fetchData(); // Panggil fungsi fetchData setelah mendapatkan token

      // request ke server setiap 5detik untuk memperbarui data secara otomatis tapi bisa memperlambat server?
      //   const intervalId = setInterval(fetchData, 5000); // Polling setiap 5 detik (5000 milidetik)

      //   // Bersihkan interval saat komponen di-unmount
      //   return () => {
      //     clearInterval(intervalId);
      //   };
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleDropdownSelect = (selectedItem) => {
    setDropdownTitle(selectedItem);
    console.log(selectedItem);
  };

  // Switch
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
  };
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&::before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&::after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  return (
    <div className="content__container">
      <Navbar navbarText="Management / Data User Access" />
      <div className="table__container">
        <div className="user__access__top">
          <h1>Data User Access</h1>
        </div>
        <div className="user__access__middle">
          <div className="user__access__middle__top">
            <Dropdown
              onSelect={handleDropdownSelect}
              className="user__access__dropdown"
            >
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {dropdownTitle}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {dropdownData.map((item, index) => (
                  <Dropdown.Item key={index} eventKey={item.namaJabatan}>
                    {item.namaJabatan}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="user__access__middle__bottom">
            <div className="access__row">
              <div className="access__row__left">
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={menuSwitch}
                      onChange={handleMenuSwitchChange}
                    />
                  }
                  label="Menu"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="access__row__right">
                <h1>Sub Menu</h1>
              </div>
            </div>
            <div className="access__row">
              <div className="access__row__left">
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={dashboardSwitch}
                      onChange={handleDashboardSwitchChange}
                    />
                  }
                  label="Dashboard"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="access__row__right"></div>
            </div>
            <div className="access__row">
              <div className="access__row__left">
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={detailDataSwitch}
                      onChange={handleDetailDataSwitchChange}
                    />
                  }
                  label="Detail Data"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="access__row__right__parent">
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={absenSwitch}
                        onChange={handleAbsenSwitchChange}
                      />
                    }
                    label="Absen"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={cutiSakitSwitch}
                        onChange={handleCutiSakitSwitchChange}
                      />
                    }
                    label="Cuti/Sakit"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={reimburseSwitch}
                        onChange={handleReimburseSwitchChange}
                      />
                    }
                    label="Reimburse"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={timesheetSwitch}
                        onChange={handleTimesheetSwitchChange}
                      />
                    }
                    label="Timesheet"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={trackingSwitch}
                        onChange={handleTrackingSwitchChange}
                      />
                    }
                    label="Tracking"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
            </div>
            <div className="access__row">
              <div className="access__row__left">
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={managementSwitch}
                      onChange={handleManagementSwitchChange}
                    />
                  }
                  label="Management"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="access__row__right__parent">
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={userSwitch}
                        onChange={handleUserSwitchChange}
                      />
                    }
                    label="User"
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={userAccessSwitch}
                        onChange={handleUserAccessSwitchChange}
                      />
                    }
                    label="User Access"
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={userMemberSwitch}
                        onChange={handleUserMemberSwitchChange}
                      />
                    }
                    label="User Member"
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
            </div>
            <div className="access__row">
              <div className="access__row__left">
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={manualServiceSwitch}
                      onChange={handleManualServiceSwitchChange}
                    />
                  }
                  label="Manual Service"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
            <div className="access__row">
              <div className="access__row__left">
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={masterDataSwitch}
                      onChange={handleMasterDataSwitchChange}
                    />
                  }
                  label="Master Data"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="access__row__right__parent">
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={announcementSwitch}
                        onChange={handleAnnouncementSwitchChange}
                      />
                    }
                    label="Announcement"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={claimSwitch}
                        onChange={handleClaimSwitchChange}
                      />
                    }
                    label="Claim"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={cutiSwitch}
                        onChange={handleCutiSwitchChange}
                      />
                    }
                    label="Cuti"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={jabatanSwitch}
                        onChange={handleJabatanSwitchChange}
                      />
                    }
                    label="Jabatan"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={karyawanSwitch}
                        onChange={handleKaryawanSwitchChange}
                      />
                    }
                    label="Karyawan"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={liburSwitch}
                        onChange={handleLiburSwitchChange}
                      />
                    }
                    label="Libur"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={permissionSwitch}
                        onChange={handlePermissionSwitchChange}
                      />
                    }
                    label="Permission"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={projectSwitch}
                        onChange={handleProjectSwitchChange}
                      />
                    }
                    label="Project"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
            </div>
            <div className="access__row">
              <div className="access__row__left">
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={parameterSwitch}
                      onChange={handleParameterSwitchChange}
                    />
                  }
                  label="Parameter"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="access__row__right__parent">
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={generalSwitch}
                        onChange={handleGeneralSwitchChange}
                      />
                    }
                    label="General"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={reimburseParamSwitch}
                        onChange={handleReimburseParamSwitchChange}
                      />
                    }
                    label="Reimburse"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
            </div>
            <div className="access__row">
              <div className="access__row__left">
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={reportDataSwitch}
                      onChange={handleReportDataSwitchChange}
                    />
                  }
                  label="Report Data"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="access__row__right__parent">
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={claimReportSwitch}
                        onChange={handleClaimReportSwitchChange}
                      />
                    }
                    label="Claim"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={detailSwitch}
                        onChange={handleDetailSwitchChange}
                      />
                    }
                    label="Detail"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={summarySwitch}
                        onChange={handleSummarySwitchChange}
                      />
                    }
                    label="Summary"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
            </div>
            <div className="access__row">
              <div className="access__row__left">
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={uploadSwitch}
                      onChange={handleUploadSwitchChange}
                    />
                  }
                  label="Upload"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="access__row__right__parent">
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={absenUploadSwitch}
                        onChange={handleAbsenUploadSwitchChange}
                      />
                    }
                    label="Absen"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="access__row__right">
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={apkSwitch}
                        onChange={handleApkSwitchChange}
                      />
                    }
                    label="Apk"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="user__access__bottom"></div>
      </div>
    </div>
  );
};

export default ManagementUserAccess;
