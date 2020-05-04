import axios from 'axios';

const API_URL = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) =>{
  let changeableUrl = API_URL;

  if(country){
    changeableUrl = `${API_URL}/countries/${country}`
  }

  try{
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

    const modifyData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate
    }

    return modifyData;
  }catch(error){
    
    return {
      confirmed : 0,
      recovered : 0,
      deaths : 0,
      lastUpdate: 0
    }

  }
}

export const fetchDailyData = async () =>{
  try {
    const { data } = await axios.get(`${API_URL}/daily`);

    const modifyData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate
    }));

    return modifyData;
  } catch (error) {
    
    return {
      confirmed: 0,
      deaths: 0,
      date: 0
    }

  }
}

export const fetchCountries = async () =>{
  try {
    const { data } = await axios.get(`${API_URL}/countries`);

    return data.countries;
  } catch (error) {
    
    return null

  }
}