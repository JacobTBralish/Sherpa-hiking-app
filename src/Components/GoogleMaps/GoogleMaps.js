import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class GoogleMaps extends Component {
    constructor(props){
        super(props);
        this.state = {
            // isMarkerShown: false
        }
    }


 render(){   
const TrailsMap = withScriptjs(withGoogleMap((props) => 
 
    <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))
    return(
        <div>
            <TrailsMap
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height:`400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}
}

export default GoogleMaps;