import React from 'react'
import "./datakaryawan.css"

const DataKaryawan = (props) => {
  return (
    <div className="data__karyawan__container">
        <h1>Data Karyawan</h1>
        <div className="horizontal__line"></div>

        {props.showDataKaryawan && (
            <div className="data__karyawan__children">
                
            </div>
        )}
    </div>
  )
}

export default DataKaryawan