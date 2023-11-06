/* eslint-disable react/prop-types */
import { FormControl } from 'react-bootstrap';

const BoxInput = (props) => {
  return (
    <div>
        {/* Input Box */}
        <FormControl type="text" placeholder={props.placeholder} value={props.value}
        onChange={props.onChange}/>
    </div>  
)
}

export default BoxInput