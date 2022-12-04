import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./LandingPage.css";
import Pagination from './Pagination';

function LandingPage() {
    const [data, setData] = useState([]);
    const [popupData, setPopupData] = useState({
        company:'',
        country:'',
        wikipedia:'',
        description:'',
        engine:''
    })
    const [searchData, setSearchData] = useState({
        "rocketName" : "",
        "rocketType":"",
        "origionalLaunch":""
    })
    const [showSearchData, setShowSearchData] = useState(false)

    const[showpopUp, setShowpopUp] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(100);

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = data.slice(indexOfFirstData,indexOfLastData);

    const paginate = (pageNumber)=>{
        console.log(pageNumber)
        setCurrentPage(pageNumber)
    }

    const FetchedData = ()=>{
        const url = "https://api.spacexdata.com/v3/rockets"
        
        axios.get(url)
        .then((res)=>{
            console.log(res.data)
            setData(res.data)})
    }
    useEffect(()=>{
        FetchedData()
        console.log(data)
    },[])

    
    //to show searched data
    const fetchedOnSearch = ()=>{
        console.log(searchData);
        setShowSearchData(!showSearchData)
        
    }

    //to set change values for search
    const onChangeValue = (e)=>{
        setSearchData({...searchData,[e.target.name]:e.target.value})
    }

    //to show popup
    const shopopUp = ()=>{
        console.log(popupData)
        setShowpopUp(false)
    }

  return (
      <div id='spacex'>
        
     
        <div className='banner'>
              <h1 id='heading'>SPACEX</h1>
              <p id='tagline'>It’s about believing in the future</p>
        </div>

          <div id='search'>
              <div id='searchHeading'>
                  <h2>Search Rocket</h2>
              </div>
              <div id='rocketSearch'>
                  <input type='text' className='rocketSearch' placeholder='  Rocket Name'
                  name='rocketName'
                  value={searchData.rocketName}
                  onChange={(e)=>onChangeValue(e)}
                  />
                  <input type='text' className='rocketSearch' placeholder='  Rocket Type'
                  name='rocketType'
                  value={searchData.rocketType}
                  onChange={(e)=>onChangeValue(e)}
                  />
                  <input type='text' className='rocketSearch' placeholder='  original_launch - yyyy-mm-dd'
                  name='origionalLaunch' 
                  value={searchData.origionalLaunch}
                  onChange={(e)=>onChangeValue(e)}
                  />
                  <button className='rocketSearchbtn' onClick={fetchedOnSearch}>Search</button>
              </div>
          </div>
          {!showSearchData && 
          <>
          <div id='rocketData'>
              {currentData && currentData.map((rocket, index) => {
                  return <div key={index} className={'fetchedData'}
                      onClick={() => {
                          console.log(rocket)
                          setShowpopUp(true)
                          setPopupData({
                              company: rocket.company,
                              country: rocket.country,
                              wikipedia: rocket.wikipedia,
                              description: rocket.description,
                              engine : rocket.engines
                          })
                      }}
                  >
                      <h3 className='details'>Rocket Name:-{rocket.rocket_name}</h3>
                      <h3 className='details'>Rocket Type:-{rocket.rocket_type}</h3>
                      <h3 className='details'>Original launch:-{rocket.first_flight}</h3>
                      <img
                          src={rocket.flickr_images[0]}
                          alt="rocket"
                          className='rocketImage'
                      />

                  </div>
              })}

              {showpopUp &&
                  <div className='popup'>
                      <div className='popuptext'>
                          <li>Company:- {popupData.company}</li>
                          <li>Country:- {popupData.country}</li>
                          <li>Wekipedia:- {popupData.wikipedia}</li>
                          <p className='description'>{popupData.description}</p>
                          <p>Engine Details:-</p>
                          <li>{popupData.engine.layout} type layout was used.</li>
                          <li>{popupData.engine.propellant_1} Propellant & {popupData.engine.propellant_2} propellant were used for propulsion</li>
                          <li>It created thrust of {popupData.engine.thrust_sea_level.kN}KN on sea level</li>
                      </div>
                      <div className='cancel' onClick={shopopUp}>X</div>
                  </div>
              }
          </div>
          <Pagination dataPerPage={dataPerPage} totalData={data.length} paginate={paginate} />
          </>
          
          }
          
        
          {showSearchData && currentData && currentData.map((rocket, index) => {
            if(rocket.rocket_name === searchData.rocketName && rocket.rocket_type===searchData.rocketType && rocket.first_flight===searchData.origionalLaunch)
            return <div key={index} className={'fetchedData'} >
                <h3 className='details'>Rocket Name:-{rocket.rocket_name}</h3>
                <h3 className='details'>Rocket Type:-{rocket.rocket_type}</h3>
                <h3 className='details'>Original launch:-{rocket.first_flight}</h3>
                <img src={rocket.flickr_images[0]} alt="rocket" className='rocketImage'/>
            </div>})
          }
          
      </div>
    
  )
}

export default LandingPage