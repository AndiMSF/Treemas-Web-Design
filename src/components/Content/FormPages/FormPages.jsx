/* eslint-disable react/prop-types */
import "./form.css"
import BoxInput from "../../Elements/BoxInput/BoxInput.jsx"
import TextArea from "../../Elements/TextArea/TextArea"
import Button from "../../Elements/Buttons/Button.jsx"
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

const FormPages = (props) => {
  return (
    <div className="form__container">
        <div className="form__container__top">
            <h1>{props.formTitle}</h1>
            <div className="horizontal__line"></div>
        </div>
        <div className="form__container__middle">
            {props.boxInput && props.boxInput.map((boxInput, index) => (
                <div className="form__row" key={index}>
                    <div className="form__row__left">
                        <p>{boxInput}</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder={boxInput} />    
                    </div>
                </div>
            ))}

            {props.textArea && props.textArea.map((textArea, index) => (
                <div className="form__row" key={index}>
                    <div className="form__row__left">
                        <p>{textArea}</p>
                    </div>          
                    <div className="form__row__right">
                        <TextArea placeholder={textArea} />    
                    </div>
                </div>
            ))}
            
            {props.showUpload && props.image.map((image, index) => (
                <div className="form__row" key={index}>
                    <Form.Group class="upload" controlId="formFile">
                        <div className="form__row__left">
                            <Form.Label>{image}</Form.Label>
                        </div>
                        <div className="form__row__right">
                            <Form.Control type="file" />
                        </div>
                    </Form.Group>
                </div>
            ))}
            
        </div>
        <div className="form__row__bottom">
            <Link to={props.to} className="cancel__button" text="Cancel">Cancel</Link>
            <Button className="submit__button" text="Submit"/>
        </div>
    </div>
  )
}

export default FormPages