import { useState } from "react"
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


const InformationMiddle = (props) => {
    const [selectedPlace, setSelectedPlace] = useState(null);

    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace(props);
    };

    const onInfoWindowClose = () => {
        setSelectedPlace(null);
    };

    const mapStyles = {
        width: "100%",  // Lebar peta
        height: "100%", // Tinggi peta
      };
      
      const infoMiddleStyles = {
        position: "relative",
        width: "100%", // Lebar information__middle
        height: "700px", // Tinggi information__middle
      };

    return (
        <div className="information__middle" style={infoMiddleStyles}>
            {props.showMaps && (
                <Map google={props.google} zoom={14} style={mapStyles}>
                    <Marker onClick={onMarkerClick} name={'Current location'} />
                    <InfoWindow onClose={onInfoWindowClose}>
                        <div>
                            {selectedPlace && <h1>{selectedPlace.name}</h1>}
                        </div>
                    </InfoWindow>
                </Map>
            )}
        </div>
    );
}
export default GoogleApiWrapper({
    apiKey: ("v=3.exp&libraries=places,geometry,drawing&key=AIzaSyAsfpH3XCMlOmS0B4y8PYRnRS_i0QfG_hA")
  })( InformationMiddle);