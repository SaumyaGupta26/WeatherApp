import { writable } from 'svelte/store';

// Define a type for weather data

interface WeatherData {
    forecast: any[]; // Define the structure of forecast data
    // Add other properties if needed
}

// Initialize currentWeather store with default structure
export const currentWeather = writable<WeatherData>({
    forecast: [],
    // Initialize other properties if needed
});

// Define writable store for current location input
export const currentLocation = writable('');