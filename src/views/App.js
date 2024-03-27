import '../css/App.css';
import NavbarComponent from '../components/Navbar';
import getParkingMeterMapPoints from '../utils/maps/getParkingMeterPoints';
import React, {useState, useEffect} from 'react';
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
      <APIProvider apiKey={'API KEY'}>
        <Map style={{width: "100%", height: "100%"}} defaultCenter={{lat: 42.1292, lng: -80.0851}}>
          {mapPoints && mapPoints.map((point, index) => (
            <AdvancedMarker
              key={index}
              position={{lat: point.location.latitude, lng: point.location.longitude}}
              onClick={() => setSelectedPoint(point)}
            />
          ))}
          {selectedPoint && (
            <InfoWindow anchor={selectedPoint} onCloseClick={() => setSelectedPoint(null)}>
              <div>{`Meter #${selectedPoint.number}`}</div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
    
  );
};

export default App;
