<script lang="ts">
    import {currentWeather} from '../store';
    import { onMount } from 'svelte';
    
    import {fetchWeatherData} from '../api';
    
  //URLs for different weather conditions
  const RAIN_URL = "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs=";
  const HOT_URL = "https://media.istockphoto.com/id/1254065595/photo/hot-summer-or-heat-wave-background.jpg?s=612x612&w=0&k=20&c=wp60t_1SUG9qDTxzAJwvfZYlLVAiu9r737F_nvtOSPA="
  const COLD_URL = "https://media.istockphoto.com/id/160840799/photo/icicles-and-snowstorm.jpg?s=612x612&w=0&k=20&c=LKgdYGIdh94AZ9Q5F9IE5TSHY1zz4oP4uauG79KIN8w=";

    let weatherData: any = null;
    let searchString: string = '';

    currentWeather.subscribe(value =>{
        weatherData = value;
        console.log('Weather data:', weatherData);
        setWeatherImage();
    })
    
    //function to search the weather
    async function searchWeather(event: Event) {
    try {
      event.preventDefault();
      if (searchString.trim() === '') {
        console.error('Please enter a valid location');
        
        return;
      }

      const data = await fetchWeatherData(searchString.trim());
      currentWeather.set(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    
  }

  async function setWeatherImage() {
   if (weatherData && weatherData.weather) {
            const weatherCondition = weatherData.weather[0].main.toLowerCase();
            if (weatherCondition.includes('rain')) {
                weatherData.imageUrl = RAIN_URL;
            } else if (weatherData.main.temp > 15) {
                weatherData.imageUrl = HOT_URL;
            } else {
                weatherData.imageUrl = COLD_URL;
            }
        }
  }


    onMount(async () => {
    try {
      const data = await fetchWeatherData('London');
      currentWeather.set(data); 
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  })
 
    
  
    
</script>

<div class="card">
  <input type="text" bind:value={searchString} placeholder="Enter location">
  <button on:click={searchWeather}>Search</button>

  {#if weatherData.imageUrl}
            <img class="weather-image" src={weatherData.imageUrl} alt="Weather Image">
  {/if}

  {#if weatherData}
        <h2 class="text-xl font-semibold">{#if weatherData.name}{weatherData.name}{:else}Unknown{/if}</h2>
        <p class="text-lg"><b>Temperature:</b> {#if weatherData.main && weatherData.main.temp}{Math.round(weatherData.main.temp - 273.15)}°C{:else}Unknown{/if}</p>
        <p><b>Description: </b>{#if weatherData.weather && weatherData.weather[0] && weatherData.weather[0].description}{weatherData.weather[0].description}{:else}Unknown{/if}</p>
        <p><b>Wind Speed:</b> {#if weatherData.wind && weatherData.wind.speed}{weatherData.wind.speed} m/s{:else}Unknown{/if}</p>
        <p> <b>Humidity:</b> {#if weatherData.main && weatherData.main.humidity}{weatherData.main.humidity}%{:else}Unknown{/if}</p>

   {:else}
        <div class="loader"></div>
        <p>Loading...</p> 
    {/if}


  
</div>

<style>
     .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 20px;
        background-color: #f7f7f7;
        box-shadow: 0 4px 6px rgba(50, 132, 167, 2);
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .weather-image{
      
      border-radius: 30px;
      box-shadow: 0 4px 6px rgba(0, 0, 2, 2);
      width: 50%; /* Ensure the image fills the container */
      height: 50%; /* Ensure the image fills the container */
      object-fit: cover; 
    }

    input[type="text"],
    button {
        margin-bottom: 10px;
    }

    .loader {
        border: 4px solid #f3f3f3;
        border-radius: 50%;
        border-top: 4px solid #3498db;
        width: 30px;
        height: 30px;
        animation: spin 2s linear infinite;
        margin: auto;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
</style>