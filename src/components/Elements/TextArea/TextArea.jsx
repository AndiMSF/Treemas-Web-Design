/* eslint-disable react/prop-types */
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./textarea.css"

const TextArea = (props) => {
  return (
    <InputGroup>
        <Form.Control value={props.value} onChange={props.onChange} as="textarea" aria-label="With textarea" placeholder={props.placeholder}/>
    </InputGroup>
  )
}

export default TextArea