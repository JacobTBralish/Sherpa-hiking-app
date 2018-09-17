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
    render() { 

        let { citiesList, chooseCity, chosenState } = this.props;
        console.log(citiesList)
        let mappedCities = citiesList.map((city, index) => {
            if (city[0] === chosenState){
            return <Link key={index} to={`/selecttrail`}><button onClick={(e) => chooseCity(e.target.value)}><div >push<City {...citiesList} /></div></button></Link>
        }})
        // console.log(citiesList)

        return ( 
            <div>
                <div>
                    {mappedCities}
                </div>
                SelectCity
            </div>
         );
    }
}

const mapStateToProps = state => {
    return{
        citiesList: state.citiesList,
        chosenState: state.chooseState
    }
    
}

const mapDispatchToProps = {
    chooseCity,
    getCities,
    chooseState
}
 
export default connect(mapStateToProps,mapDispatchToProps)(SelectCity);
 