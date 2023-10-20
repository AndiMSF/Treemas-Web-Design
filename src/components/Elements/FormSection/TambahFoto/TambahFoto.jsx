import React from 'react'
import "./tambahfoto.css"

const TambahFoto = (props) => {
  return (
    <div className="tambah__foto__container">
        <div onClick={props.onClickFoto} className="section__header">
            <div className="section__header__top">
                <h1>Tambah Foto</h1>
                <i className={props.showChildrenFoto ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="section__bottom">
                <div className="horizontal__line"></div>
            </div>
        </div>

        {props.showChildrenFoto && (
            <div className="tambah__foto__children">
                
            </div>
        )}
    </div>
  )
}

export default TambahFoto