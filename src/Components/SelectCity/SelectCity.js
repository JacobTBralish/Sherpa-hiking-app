import React, { Component } from 'react';
import { getCities, chooseCity, chooseState } from '../../Redux/reducer';
import axios from 'axios';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import City from './city';


class SelectCity extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }

    componentDidMount() {
        axios.get('https://raw.githubusercontent.com/JacobTBralish/list-of-states/master/majorcities.json').then(res => {
            console.log(res.data)
            this.props.getCities(res.data)
        })
    }


    filterAndFindCities = (stateArray, chosenState) => {
        let mappedCities; 
        for(let key in stateArray){
            if(key === chosenState){
                mappedCities = stateArray[key][0]
            }
        }
        if(mappedCities){
            return Object.keys(mappedCities).map((cityName, index) => {
                console.log(cityName)
                return {name: cityName, coordinates: {latitude: mappedCities[cityName].latitude, longitude: mappedCities[cityName].longitude}}
            })
        }
    }


    render() { 

        let { citiesList, chooseCity, chosenState } = this.props;
        
        let mappedCities = this.filterAndFindCities(citiesList[0], chosenState) ? this.filterAndFindCities(citiesList[0], chosenState).map((city, index) => {
            return <Link key={index} 
            to={{ 
            pathname: '/trails', 
            state: { longitude:  city.coordinates.longitude, latitude: city.coordinates.latitude} 
          }}>{city.name}</Link>
        }) : 'loading...';
        
      
       console.log(mappedCities)

        return ( 
            <div>
                <div>
                    {mappedCities}
                </div>
                
            </div>
         );
    }
}

const mapStateToProps = state => {
    return{
        citiesList: state.citiesList,
        chosenState: state.chosenState
    }
    
}

const mapDispatchToProps = {
    chooseCity,
    getCities,
    chooseState
}
 
export default connect(mapStateToProps,mapDispatchToProps)(SelectCity);
 