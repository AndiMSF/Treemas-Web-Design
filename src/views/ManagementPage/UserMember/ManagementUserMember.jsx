import "./usermember.css"
import Navbar from "../../../components/Content/Navbar/Navbar"
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";


const ManagementUserMember = () => {

    
      const columns = [
        {
            name: "Action",
            sortable: false,
            cell: (d) => (
              <>
                <i
                  key={`edit-${d.title}`}
                  className="first fas fa-pen"
                ></i>                
              </>
            )
        },
        {
          name: "NIK",
          selector: (row) => row.userId,
          sortable: true
        },
        {
            name: "Nama Karyawan",
            selector: (row) => row.fullName,
            sortable: true
          },
    ];
       
    
      const dataTable = {
        columns,
        data: ''
      };
    
    
        

    return <div className="content__container">
            <Navbar navbarText="Management / User Member" />
            <div className="table__container">
              <DataTableExtensions {...dataTable}>
                <DataTable
                  columns={columns}
                  noHeader
                  defaultSortField="title"
                  sortIcon={<SortIcon />}
                  defaultSortAsc={true}
                  pagination
                  highlightOnHover
                  dense
                />
              </DataTableExtensions>
    
            </div>

        </div>

}
export default ManagementUserMember