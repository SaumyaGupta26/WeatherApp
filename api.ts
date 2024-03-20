

export async function fetchWeatherData(location: string): Promise<any> {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=76c7bf95c3f5dad3d899e28e3c6b4aec`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    console.log('Weather API Response:', data); 
    return data;
}

