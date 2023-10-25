/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./tracking.css"
import Information from "../../../components/Content/Information/Information"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Button from "../../../components/Elements/Buttons/Button"
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { useState } from "react"

const DetaildataTracking = (props) => {
    const [selectedPlace, setSelectedPlace] = useState(null);

    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace(props);
    };

    const onInfoWindowClose = () => {
        setSelectedPlace(null);
    };

    return <div className="tracking__container">
        <div className="content__container">
            <Navbar navbarText="Detail Data / Tracking" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Tanggal"/>
                        <BoxInput placeholder="NIK"/>
                        <Button text="Pencarian" className="search__button" />

                    </div>
                    <div className="right__container__input">
                    </div>
                </div>

                {/* Google Maps */}
                <Map google={props.google} zoom={14}>
                    <Marker onClick={onMarkerClick} name={'Current location'} />

                    <InfoWindow onClose={onInfoWindowClose}>
                        <div>
                        {selectedPlace && <h1>{selectedPlace.name}</h1>}
                        </div>
                    </InfoWindow>
                </Map>
            <Information informationText="Tracking" showDropdown={false}/>
        </div>
    </div>
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyByMFGn8i353SjJL_H0_hEfTmpUPx3_lC8")
  })( DetaildataTracking);