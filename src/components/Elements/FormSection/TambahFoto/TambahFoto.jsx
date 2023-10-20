import React from 'react'
import "./tambahfoto.css"

const TambahFoto = (props) => {
  return (
    <div className="tambah__foto__container">
        <h1>Tambah Foto</h1>
        <div className="horizontal__line"></div>

        {props.showTambahFoto && (
            <div className="tambah__foto__children">
                
            </div>
        )}
    </div>
  )
}

export default TambahFoto