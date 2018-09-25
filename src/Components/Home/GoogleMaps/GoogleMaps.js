import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");


class GoogleMaps extends Component {
    constructor(props){
        super(props);
        this.state = {
            isMarkerShown: false,
            markers: [],
        }
    }

    componentDidMount(){
        this.delayedShowMarker();
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({
                isMarkerShown: true
            })
        }, 2000)
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

 render(){   
     let { isMarkerShown } = this.state;
const TrailsMap = withScriptjs(withGoogleMap((props) => 
 
    <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 39.830710, lng: -98.580517 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 39.830710, lng: -98.580517 }} />}
    {/* <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.photo_id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      ))}
    </MarkerClusterer> */}
  </GoogleMap>
  
))
    return(
        <div>
            <TrailsMap
            isMarkerShown={isMarkerShown}
            onMarkerClick={ this.handleMarkerClick }
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAhBiMZ58GJ0s7lByIQVZpEsaetOT_Rf9o&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height:`400px`, width: `100vw` }}/>}
            mapElement={<div style={{ height: `100%` }} />}
            // MapWithAMarkerClusterer markers={this.state.markers} 
            />

        </div>
    )
}
}
export default GoogleMaps;