import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import axios from 'axios';
 
export class GoogleMapsContainer extends Component {

componentDidMount() {
    // getLocation = axios.get('')
}

  render() {
    return (
      <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              {/* <h1>{this.state.selectedPlace.name}</h1> */}
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAhBiMZ58GJ0s7lByIQVZpEsaetOT_Rf9o')
  })(GoogleMapsContainer)