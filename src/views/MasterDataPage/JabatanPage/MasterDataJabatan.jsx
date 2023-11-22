/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import "./jabatan.css";
import Navbar from "../../../components/Content/Navbar/Navbar";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";




const MasterDataJabatan = () => {

  const data =  [
    {
      id: 1,
      idJabatan: "EMPL",
      nJabatan: ["Karyawan"],      
    },

    {
      id: 2,
      idJabatan: "HEAD",      
      nJabatan: ["Header"]
    }
  ]

  const columns = [
    {
      name: "ID",
      selector: "idJabatan",
      sortable: true
    },
    
    {
      name: "Nama Jabatan",
      selector: "nJabatan",
      sortable: true,
      cell: (d) => <span>{d.nJabatan.join(", ")}</span>
    },
    {
      name: "Action",
      sortable: false,
      selector: "null",
      cell: (d) => [
        <i
        key={`edit-${d.id}`} // Gunakan ID atau kunci unik lainnya dari data
        onClick={handleClick.bind(this, d.title)}
        className="first fas fa-pen"
        ></i>,
        <i
        key={`delete-${d.id}`} // Gunakan ID atau kunci unik lainnya dari data
        onClick={handleClick.bind(this, d.title)}
        className="fas fa-trash-alt"
        ></i>
      ]
    }
  ];

  const dataTable = {
    columns,
    data
  };

  const handleClick = (title) => {
    console.log(`You clicked me! ${title}`);
  };

 

  return (
    <div className="jabatan__container">
      <div className="content__container">
        <Navbar navbarText="Master Data / Jabatan" />
        <div className="table__container">       
        <DataTableExtensions {...dataTable}>
        <DataTable
          columns={columns}
          data={data}
          noHeader
          defaultSortField="id"
          sortIcon={<SortIcon />}
          defaultSortAsc={true}
          pagination
          highlightOnHover
          dense/>
        </DataTableExtensions>
        </div>

      </div>
    </div>
  );
};

export default MasterDataJabatan;
