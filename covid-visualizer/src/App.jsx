import React, { Component } from 'react'

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

export default class App extends Component {
  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData })
  }


  handlerCountryChange = async ( country ) =>{
    let fetchedData = '';

    if(country === 'Global'){
      fetchedData = await fetchData();
      this.setState({ data: fetchedData, country: '' });

    }else{
      fetchedData = await fetchData(country);
      this.setState({ data: fetchedData, country: country });
    }
  }

  
  render() {
    const { data, country } = this.state 

    return (
      <div className={styles.container}>
        <Cards data={data}/>
        <CountryPicker handlerCountryChange={this.handlerCountryChange} />
        <Chart data={data} country={country} />
      </div>
    )
  }
}
