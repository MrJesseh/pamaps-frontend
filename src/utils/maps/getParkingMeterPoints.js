import axios from "axios";

export default async function getParkingMeterMapPoints(){
    let response;
    let data;

    try{
        response = await axios.get('http://localhost:5050/map/get-parking-meter-points');
    }catch(error){
        console.error(error);
        return false;
    }

    data = await response.data;
    return data;
}
