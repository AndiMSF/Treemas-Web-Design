/* eslint-disable react/prop-types */
import "./tambahfoto.css"
import Form from 'react-bootstrap/Form';


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
                <Form.Group controlId="formFile">
                    <Form.Label>Foto</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <Form.Group controlId="formFile">
                    <Form.Label>Foto KTP</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <Form.Group controlId="formFile">
                    <Form.Label>Foto NPWP </Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <Form.Group controlId="formFile">
                    <Form.Label>Foto KK</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <Form.Group controlId="formFile">
                    <Form.Label>Foto asuransi</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                
            </div>
        )}
    </div>
  )
}

export default TambahFoto