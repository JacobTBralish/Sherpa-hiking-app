import React, { Component } from 'react';
import GoogleMapsContainer from './GoogleMapsContainer';

class GoogleMaps extends Component {
    static defaultProps = { 
        center: {
            lat: 32.337044,
            lng: -111.033896

        }
     }

     
    render() { 
        return ( 
        <div>
            <div><GoogleMapsContainer/></div>
        </div>
         );
    }
}
 
export default GoogleMaps;