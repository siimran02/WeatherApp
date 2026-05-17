document.addEventListener('DOMContentLoaded',()=>{
    const cityInput = document.getElementById('input-city');
    const getweatherbtn = document.getElementById('wheather-search-button');
    const weatherInfo = document.getElementById('wheather-info');
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const descripstionDisplay = document.getElementById('descirption');
    const errorMessage = document.getElementById('Error-message');
    const LandDesign = document.getElementById('Landing-deign');
    const API_KEY = "736b42e66ef0ab3424d5ed2eaa0eea38";

    getweatherbtn.addEventListener('click',async()=>{
        const city = cityInput.value.trim();

        if(!city) return;
        //it may throw an error 
        //server/database is always in another continent 

        try{
            const weatherData = await fetchWheatherData(city);
            displayWeatherData(weatherData);
            cityInput.value = '';
            cityInput.placeholder = 'Enter city name';
        }catch(error){
            showError();
        }

    })
    async function fetchWheatherData(city){
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE", response);
        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json();
        return data
    }
    function displayWeatherData(data){
        //display the data
        console.log(data);
        const{name,main,weather} = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent =`Temperature: ${main.temp}°C feels ${main.feels_like}°C`;
        descripstionDisplay.textContent =`Weather: ${weather[0].description}`;
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        LandDesign.classList.add("hidden");

    }
    function showError(){
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        LandDesign.classList.add("hidden");

    }

});