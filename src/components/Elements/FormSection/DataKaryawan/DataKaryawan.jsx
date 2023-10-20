import React from 'react'
import "./datakaryawan.css"

const DataKaryawan = (props) => {
  return (
    <div className="data__karyawan__container">
        <div onClick={props.onClickKaryawan} className="section__header">
            <div className="section__header__top">
                <h1>Data Karyawan</h1>
                <i className={props.showChildrenKaryawan ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="section__bottom">
                <div className="horizontal__line"></div>
            </div>
        </div>

        {props.showChildrenKaryawan && (
            <div className="data__karyawan__children">

            </div>
        )}
    </div>
  )
}

export default DataKaryawan