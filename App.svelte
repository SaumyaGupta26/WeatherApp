<script lang="ts">
	
	import {currentWeather} from './store';
	import WeatherDisplay from './components/WeatherDisplay.svelte';
	
	let showForecast = false;

	function toggleForecast(){
		showForecast = !showForecast;
	}

	
</script>

<main class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
	<p class="heading">Weather Analyzer</p>
	<br>

	<WeatherDisplay />
	
	<button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={toggleForecast}>
		{showForecast ? 'Hide Forecast' : 'Show Forecast'}
	</button>


</main>

<style>
	main {
        padding: 2rem;
        text-align: center;
		
    }

    .heading {
        font-size: 2.5rem;
        font-weight: bold;
        color: #333;
		background-color: #d9b4da;
		height: 80px;
		width: 390px;
		border-radius: 20px;
		display: flex;
		justify-content: center;
		padding: 0 1rem;
		align-items: center; 
    	margin: auto; 
		box-shadow: 0 4px 6px rgba(0, 0, 0, 2);;
    }
	@media (max-width: 500px) {
    .heading {
        font-size: 1.5rem; /* Increase font size for larger screens */
		width: 290px;
    }
}

    button {
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #00ffdd;
    }
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	@import './globals.css';
</style>