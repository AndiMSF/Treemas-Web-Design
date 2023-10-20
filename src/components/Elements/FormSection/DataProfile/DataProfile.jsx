import React from 'react'
import "./dataprofile.css"

const DataProfile = (props) => {

  return (
    <div className="data__profile__container" onClick={props.onClick}>
        <h1>Data Profile</h1>

        {props.showChildrenProfile && (
            <div>Hai</div>
        )}
    </div>

  )
}

export default DataProfile