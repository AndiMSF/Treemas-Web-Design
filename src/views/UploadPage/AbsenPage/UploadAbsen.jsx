/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./absen.css";
import Information from "../../../components/Content/Information/Information";
import Navbar from "../../../components/Content/Navbar/Navbar";
import BoxInput from "../../../components/Elements/BoxInput/BoxInput";
import Button from "../../../components/Elements/Buttons/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { EXCEL_FILE_BASE64 } from "../../../../constants";
import FileSaver from "file-saver";
import { useNavigate } from "react-router-dom";
import { ExportToExcel } from "../../../../ExportToExcel";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import axios from "axios";

const UploadAbsen = () => {
  const navigate = useNavigate();
  const infoTopFields = ["NIK", "Nama Lengkap", "Tanggal", "Project", "Status"];
  const [selectedFile, setSelectedFile] = useState(null);
  const [apiData, setApiData] = useState([]);

  const getRowColor = (row) => {
    switch (row.status) {
      case "DISETUJUI":
        return {
          backgroundColor: "#AAD9BB",
          color: "0000",
          borderRadius: "5px",
          padding: "5px",
          width: "85%",
          textAlign: "center",
          fontWeight: "600",
        };
      case "DITOLAK":
        return {
          backgroundColor: "#E74646",
          color: "0000",
          borderRadius: "5px",
          padding: "5px",
          width: "85%",
          textAlign: "center",
          fontWeight: "600",
        };
      case "MENUNGGU":
        return {
          backgroundColor: "#FAEF9B",
          color: "0000",
          borderRadius: "5px",
          padding: "5px",
          width: "85%",
          textAlign: "center",
          fontWeight: "600",
        };
      default:
        return {}; // Default style
    }
  };

  // Get Data Absen
  useEffect(() => {
    const fetchData = async () => {
      console.log("MASUK USE EPEK");
      try {
        const response = await fetch(
          "http://localhost:8081/api/upload/get-absen",
          {
            method: "GET", // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Sertakan token di sini
            },
          }
        );
        // Tambahkan penanganan kesalahan di sini
        const data = await response.json();
        if (data.success === true) {
          setApiData(data.data);
          console.log(data);
        }
      } catch (error) {
        if (error.message.includes("HTTP error!")) {
          const statusCode = parseInt(error.message.split(" ").pop());
          console.log("Status Code:", statusCode);

          if (statusCode === 401) {
            console.log("Masuk 401");
            // Token expired, remove token from local storage and redirect to login
            localStorage.removeItem("authToken");
          } else {
            console.log("Gak Masuk 401");
          }
        } else {
          console.log("Gak Masuk 401");
        }
      }
    };

    const token = localStorage.getItem("authToken");
    if (token) {
      fetchData(); // Panggil fungsi fetchData setelah mendapatkan token
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // submit
  const [excelData, setExcelData] = useState({
    nik: "",
    projectId: "",
    wfh: "",
    tanggal: "",
    jamMsk: "",
    jamPlg: "",
    notePekerjaan: "",
    noteTelatMasuk: "",
    notePulangCepat: "",
  });
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // Send to API

  // submit
  const fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFileChange = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only Excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };
  const getColumnData = (worksheet, columnLetter) => {
    const headerRow = 11;
    const dataRow = 12;

    const headerCellAddress = `${columnLetter}${headerRow}`;
    const headerCellValue = worksheet[headerCellAddress]
      ? worksheet[headerCellAddress].v
      : undefined;

    const columnData = [];

    if (headerCellValue) {
      for (let row = dataRow; worksheet[`${columnLetter}${row}`]; row++) {
        const cellAddress = `${columnLetter}${row}`;
        const cellValue = worksheet[cellAddress]
          ? worksheet[cellAddress].v
          : undefined;

        // Handle specific conversion for date and time columns
        let convertedValue = cellValue;
        if (columnLetter === "D") {
          // Kolom TANGGAL
          convertedValue = XLSX.SSF.format("YYYY-MM-DD", cellValue);
        } else if (columnLetter === "E" || columnLetter === "F") {
          // Kolom JAM MASUK dan JAM PULANG
          convertedValue = XLSX.SSF.format("hh:mm:ss", cellValue);
        } else if (columnLetter === "C") {
          // Kolom WFH
          // Ubah YA menjadi "1" dan TIDAK menjadi "0"
          convertedValue = cellValue === "YA" ? "1" : "0";
        }

        columnData.push(convertedValue);
      }
    }

    return { columnName: headerCellValue, columnData };
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[1];
      const worksheet = workbook.Sheets[worksheetName];

      // Ambil data kolom NIK (kolom A)
      const nikColumn = getColumnData(worksheet, "A");
      console.log(`Column Name: ${nikColumn.columnName}`);
      console.log(
        `Column Data: ${JSON.stringify(nikColumn.columnData, null, 2)}`
      );

      // Ambil data kolom PROJECT (kolom B)
      const projectColumn = getColumnData(worksheet, "B");
      console.log(`Column Name: ${projectColumn.columnName}`);
      console.log(
        `Column Data: ${JSON.stringify(projectColumn.columnData, null, 2)}`
      );

      // Ambil data kolom WFH (kolom C)
      const wfh = getColumnData(worksheet, "C");
      console.log(`Column Name: ${wfh.columnName}`);
      console.log(`Column Data: ${JSON.stringify(wfh.columnData, null, 2)}`);

      // Ambil data kolom TANGGAL (kolom D)
      const tanggal = getColumnData(worksheet, "D");
      console.log(`Column Name: ${tanggal.columnName}`);
      console.log(
        `Column Data: ${JSON.stringify(tanggal.columnData, null, 2)}`
      );

      // Ambil data kolom JAM MASUK (kolom E)
      const jamMsk = getColumnData(worksheet, "E");
      console.log(`Column Name: ${jamMsk.columnName}`);
      console.log(`Column Data: ${JSON.stringify(jamMsk.columnData, null, 2)}`);

      // Ambil data kolom JAM PULANG (kolom F)
      const jamPlg = getColumnData(worksheet, "F");
      console.log(`Column Name: ${jamPlg.columnName}`);
      console.log(`Column Data: ${JSON.stringify(jamPlg.columnData, null, 2)}`);

      // Ambil data kolom NOTE PEKERJAAN (kolom G)
      const notePekerjaan = getColumnData(worksheet, "G");
      console.log(`Column Name: ${notePekerjaan.columnName}`);
      console.log(
        `Column Data: ${JSON.stringify(notePekerjaan.columnData, null, 2)}`
      );

      // Ambil data kolom NOTE TELAT MASUK (kolom H)
      const noteTelatMasuk = getColumnData(worksheet, "H");
      console.log(`Column Name: ${noteTelatMasuk.columnName}`);
      console.log(
        `Column Data: ${JSON.stringify(noteTelatMasuk.columnData, null, 2)}`
      );

      // Ambil data kolom NOTE PULANG CEPAT (kolom I)
      const notePulangCepat = getColumnData(worksheet, "I");
      console.log(`Column Name: ${notePulangCepat.columnName}`);
      console.log(
        `Column Data: ${JSON.stringify(notePulangCepat.columnData, null, 2)}`
      );
      // Setel state atau lakukan operasi lainnya dengan data yang diambil

      setExcelData({
        nik: nikColumn.columnData[0],
        projectId: projectColumn.columnData[0],
        wfh: wfh.columnData[0],
        tanggal: tanggal.columnData[0],
        jamMsk: jamMsk.columnData[0],
        jamPlg: jamPlg.columnData[0],
        notePekerjaan: notePekerjaan.columnData[0],
        noteTelatMasuk: noteTelatMasuk.columnData[0],
        notePulangCepat: notePulangCepat.columnData[0],
      });

      try {
        const requestData = {
          nik: nikColumn.columnData[0],
          projectIdWeb: projectColumn.columnData[0],
          wfh: wfh.columnData[0],
          tglAbsen: tanggal.columnData[0],
          jamMsk: jamMsk.columnData[0],
          jamPlg: jamPlg.columnData[0],
          notePekerjaan: notePekerjaan.columnData[0],
          noteTelatMsk: noteTelatMasuk.columnData[0],
          notePlgCepat: notePulangCepat.columnData[0],
        };
        const token = localStorage.getItem("authToken");
        console.log("MASUK " + token);
        console.log("REQUEST DATA " + JSON.stringify(requestData, null, 2));
        const response = await axios.post(
          "http://localhost:8081/api/upload/add-absen",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.fire({
          title: "Success!",
          text: "Absen Uploaded",
          icon: "success",
        });
        console.log("Response from API:", response.data);
      } catch (error) {
        console.log(error);
        // Jika tidak berhasil, tampilkan pesan error
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
      }
    } else {
      setExcelData(null);
    }
  };

  const handleDownload = () => {
    let sliceSize = 1024;
    let byteCharacters = atob(EXCEL_FILE_BASE64);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      let begin = sliceIndex * sliceSize;
      let end = Math.min(begin + sliceSize, bytesLength);
      let bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    FileSaver.saveAs(
      new Blob(byteArrays, { type: "application/vnd.ms-excel" }),
      "Template_Treemas_Absent.xlsx"
    );
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('', {
  //       method: 'GET', // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`, // Sertakan token di sini
  //       },
  //     });
  //       const data = await response.json();
  //       if (data.status === 'Success') {

  //         setApiData(data.data);
  //       } else {
  //         console.log(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     fetchData(); // Panggil fungsi fetchData setelah mendapatkan token
  //   } else {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const columns = [
    {
      name: "NIK",
      selector: (row) => row.nik || "-",
      cellExport: (row) => row.nik || "-",
      sortable: true,
    },
    {
      name: "Nama Lengkap",
      selector: (row) => row.nama || "-",
      cellExport: (row) => row.nama || "-",
      sortable: true,
    },
    {
      name: "Tanggal",
      selector: (row) => row.tglAbsen || "-",
      cellExport: (row) => row.tglAbsen || "-",
      sortable: true,
    },
    {
      name: "Project",
      selector: (row) => row.projectId.namaProject || "-",
      cellExport: (row) => row.projectId.namaProject || "-",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        if (row.isApprove === "1") {
          return "DISETUJUI";
        } else if (row.isApprove === "0") {
          return "DITOLAK";
        } else {
          return "MENUNGGU";
        }
      },
      cellExport: (row) => {
        if (row.isApprove === "1") {
          return "DISETUJUI";
        } else if (row.isApprove === "0") {
          return "DITOLAK";
        } else {
          return "MENUNGGU";
        }
      },
      cell: (row) => (
        <div style={getRowColor(row)}>
          {row.status}
          {row.isApprove === "1" ? (
            <span
              style={{
                backgroundColor: "#AAD9BB",
                color: "0000",
                borderRadius: "5px",
                padding: "5px",
                display: "block",
                width: "100px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {" "}
              DISETUJUI
            </span>
          ) : null}
          {row.isApprove === "0" ? (
            <span
              style={{
                backgroundColor: "#E74646",
                color: "0000",
                borderRadius: "5px",
                padding: "5px",
                display: "block",
                width: "100px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {" "}
              DITOLAK{" "}
            </span>
          ) : null}
          {row.isApprove !== "1" && row.isApprove !== "0" ? (
            <span
              style={{
                backgroundColor: "#FAEF9B",
                color: "0000",
                borderRadius: "5px",
                padding: "5px",
                display: "block",
                width: "100px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {" "}
              MENUNGGU{" "}
            </span>
          ) : null}
        </div>
      ),
      sortable: true, // Letakkan koma di sini untuk mengakhiri properti sebelumnya
    },
  ];

  const dataTable = {
    columns,
    data: apiData,
  };

  return (
    <div className="content__container">
      <Navbar navbarText="Upload / Absen" />
      <div className="input__container">
        <div className="left__container__input__absen">
          <div className="top__container__input">
            <div className="top__container__input__left">
              <Form.Group controlId="formFile">
                <Form.Label>
                  File Xlsx{" "}
                  {excelFileError && (
                    <div
                      className="text-danger"
                      style={{ marginTop: 5 + "px" }}
                    >
                      {excelFileError}
                    </div>
                  )}
                </Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
            </div>

            <div className="top__container__input__right">
              <Button
                text="Submit"
                className="unggah__button"
                onClick={handleFileUpload}
              />
              <Button
                text="Unduh Template"
                className="unggah__button"
                onClick={handleDownload}
              />
              {/* <ExportToExcel apiData={apiData} fileName={"Template_Absent_Treemas"}/> */}
            </div>
          </div>
        </div>
      </div>
      <div className="table__container">
        <DataTableExtensions {...dataTable}>
          <DataTable
            columns={columns}
            data={apiData}
            noHeader
            defaultSortField="nik"
            sortIcon={<SortIcon />}
            defaultSortAsc={true}
            pagination
            highlightOnHover
            dense
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};

export default UploadAbsen;
