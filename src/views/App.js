import '../css/App.css';
import NavbarComponent from '../components/Navbar';
import getParkingMeterMapPoints from '../utils/maps/getParkingMeterPoints';
import React, {useState, useEffect} from 'react';
import logo from '../assets/img/parkingmeter.png';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow
} from '@vis.gl/react-google-maps';

const App = () => {
  
  const [mapPoints, setMapPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => {
    const fetchMapPoints = async () => {
      const points = await getParkingMeterMapPoints();
      setMapPoints(points);
    };
    fetchMapPoints();
  }, []);

  return (
    <div style={{width: "100vw", height: "100vh"}}>
      <NavbarComponent/>
      <APIProvider apiKey={require('../config.json').MapsKey}>
        <Map style={{width: "100%", height: "100%"}} defaultCenter={{lat: 42.1292, lng: -80.0851}} defaultZoom={14} mapId={"erie-parking-meters"}>
          {mapPoints && mapPoints.map((point, index) => (
            <AdvancedMarker
              key={index}
              position={{lat: point.location.latitude, lng: point.location.longitude}}
              onClick={() => setSelectedPoint(point)}>
              <p style={{textAlign: "center", fontWeight: "bold"}}>{`Meter #${point.number}`}</p>
              <img style={{height: "50px", width: "50px"}} src={logo}/>
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
    
  );
};

export default App;
