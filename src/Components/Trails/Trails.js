import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTrails, chooseTrail } from '../../Redux/reducer'
import GoogleMap from '../GoogleMaps/GoogleMaps';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom'

class Trails extends Component {
    constructor(){
        super();
        this.state ={
            activePage:1
        }
    }

    componentDidMount() {
    axios.get(`https://www.hikingproject.com/data/get-trails?lat=${this.props.location.state.latitude}&lon=${this.props.location.state.longitude}&maxDistance=150&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`).then((res)=> {
        console.log(res.data)
        this.props.getTrails(res.data.trails)
        }).catch(error => {
            console.log(error, 'There was an error finding the trails requested.')
        })
    }

    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }


    render() { 
        let { trailsList, chooseTrail } = this.props;

        let mappedTrails = trailsList ?  trailsList.map((trail, index) => {
            return <Link onClick={() => chooseTrail(trail.id)} className='trailButton' to={{ pathname:`/trail`}} 
             key={index}><div>
             
            
            <img src={trail.imgSmall} alt={trail.name}></img>
            <h4>{trail.name}</h4>
            <h6>Length: {trail.length + ' miles'}</h6>
            <h6>{trail.location}</h6>
            
            </div></Link>
        }) : 'loading'
        return ( 
        <div>
            <div><GoogleMap /></div>
            <div>{mappedTrails}</div>
            <p></p>
            <div>
            <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={500}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
            </div>
        
        </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        trailsList: state.trailsList,
        chooseTrail: state.chooseTrail
    }
}

const mapDispatchToProps = {
    getTrails,
    chooseTrail
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Trails);