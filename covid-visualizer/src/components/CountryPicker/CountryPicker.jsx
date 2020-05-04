import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css'
import { fetchCountries } from  '../../api';


const CountryPicker = ({ handlerCountryChange }) => {

  const [countries, setCountries] = useState([])

  useEffect(() => {
    const fetchData = async () =>{
      const fetchedCountries = await fetchCountries();
      setCountries(fetchedCountries);
    }

    fetchData();
  }, [])


  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={ (e)=> handlerCountryChange(e.target.value) }>
        <option value="Global">Global</option>
        {
          countries.map((countries, index) => {
            if(countries.iso3 && countries.iso2){
              return(
                <option key={index} value={countries.name}>{countries.name}</option>
              )
            }
          })
        }
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker
