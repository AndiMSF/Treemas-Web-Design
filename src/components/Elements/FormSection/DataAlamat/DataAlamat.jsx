import "./dataalamat.css"

const DataAlamat = (props) => {
  return (
    <div className="data__alamat__container">
        <div onClick={props.onClickAlamat} className="section__header">
            <div className="section__header__top">
                <h1>Data Alamat</h1>
                <i className={props.showChildrenAlamat ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="section__bottom">
                <div className="horizontal__line"></div>
            </div>
        </div>

        {props.showChildrenAlamat && (
            <div className="data__alamat__container">
                
            </div>
        )}
    </div>
  )
}

export default DataAlamat