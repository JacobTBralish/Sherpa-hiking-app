import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTrails, chooseTrail } from '../../Redux/reducer'
import './Trails.css';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom'


class Trails extends Component {
    constructor(){
        super();
        this.state ={
            activePage:1,
            itemsPerPage: 20
        }
    }

    componentDidMount() {
        axios.get(`https://www.hikingproject.com/data/get-trails?lat=${this.props.location.state.latitude}&lon=${this.props.location.state.longitude}&maxDistance=150&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`).then((res)=> {
        this.props.getTrails(res.data.trails)
        console.log('res.data.trails: ', res.data.trails);
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

          //FOR PAGINATION
          let activePageIndex = parseInt(this.state.activePage, 10);
          let itemsPerPageIndex = parseInt(this.state.itemsPerPage, 10);
          
          let indexOfLastTrail = activePageIndex * itemsPerPageIndex;
          let indexOfFirstTrail = indexOfLastTrail - itemsPerPageIndex;
          let renderedTrails = trailsList.slice(indexOfFirstTrail, indexOfLastTrail);

          let mappedTrails = renderedTrails ?  renderedTrails.map((trail, index) => {
              return <div className='singleTrailInfo' key={index}> 
              <Link to={{ pathname:`/trail/${trail.id}`}}>
                 
            <img id='trailImg' src={trail.imgMedium} alt={<div>{trail.name}</div>}></img>
            <button className='trailButton' onClick={() => {chooseTrail(trail.id)}}>
            <h4>{trail.name}</h4>
            <h6>{trail.location}</h6>
            </button>
            </Link>
            </div>
        }) : 'loading'


        return ( <div>
        <div className='mainTrails'>
            <div className='trailsContainer'>
               {mappedTrails}
            </div>
         </div>
           <div className='paginationContainer'>
               <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={20}
                    totalItemsCount={this.props.trailsList.length}
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