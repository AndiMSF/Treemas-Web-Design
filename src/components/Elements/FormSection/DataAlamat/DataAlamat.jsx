import "./dataalamat.css"

const DataAlamat = (props) => {
  return (
    <div className="data__alamat__container">
        <h1>Data Alamat</h1>
        <div className="horizontal__line"></div>

        {props.showDataAlamat && (
            <div className="data__alamat__container">
                
            </div>
        )}
    </div>
  )
}

export default DataAlamat