const openCageApi     = "https://api.opencagedata.com/geocode/v1/json"
const openCagekey     = "20e39edf98f9407c9785f4f2e0cae1b9"
const openWeatherMap  = "https://api.openweathermap.org/data/2.5/onecall";
const opensWeatherKey = "0a80d47cd76eab27a10c10b6c9a5723c"
const SunriseSunset   = "https://api.sunrise-sunset.org/json"

$(document).ready(function() {
    console.log("ready!"); /*aspetta che la pagina sia completaete caricata */

    $("#sub").click(function(upclick) {
        console.log("ciao!");
        deleteInfo();
        upclick.preventDefault();
        let reach_cage = openCageApi + "?key=" + openCagekey + "&q=" + $("#city").val();
        console.log(reach_cage)

        $.get(reach_cage, function(data) {
            let lat = data.results[0].geometry.lat;
            let lng = data.results[0].geometry.lng;
            console.log("return cage: ", lat, lng)
            myweather(lat, lng);
        })
    })
  
    function  myweather(lat, lng) {
        let reach_wea = openWeatherMap + "?lat=" + +lat + "&lon=" + 
        +lng + "&appid=" + opensWeatherKey;
        console.log(reach_wea);

        $.get(reach_wea, function(data) {
            let nb_days = $(".day-select").val();
            let local_time = "";
            for (let i = 0; i < nb_days; i++) {
                let day_utc = data.daily[i].dt;
                let day_meteo = data.daily[i].weather[0].main;
                let day_meteoDescrip = data.daily[i].weather[0].description;
                console.log("return weather "+i+":", day_meteo, " ", day_meteoDescrip);

                let offset = data.timezone_offset;
                local_time = new Date((data.current.dt + offset) * 1000);
                /*console.log("dt local time: ", local_time,  " ("+data.current.dt+"+"+offset+")");*/

                document.getElementById("day" + i).classList.remove("hidden");
                printDay(i, day_utc);
                iconaMeteo(i, day_meteo, day_meteoDescrip);
                /*mytime(lat, lng, local_time)*/
            }
            mytime(lat, lng, local_time);
        })
    }

    function mytime(lat, lng, time) {
        let reach_time = SunriseSunset + "?lat=" + +lat + "&lon=" + 
        +lng + "&formatted=0";
        console.log(reach_time)

        $.get(reach_time, function(data) {
            let brut = data.results.sunrise;
            let sunrise = Date.parse(data.results.sunrise);
            let sunset = Date.parse(data.results.sunset);
            console.log(brut, ", utc sunrise: ", sunrise, ", utc sunset: ", sunset);
            
            if (time > sunrise && time < sunset) {
                document.body.classList.remove("standard")
                document.body.classList.add("giorno")
                document.querySelector('h1').classList.remove('notteImg')
                for (let i = 0; i < 7; i++) {
                   document.getElementsByClassName("icone")[i].classList.remove("notteImg")
                   document.getElementsByClassName("h2bianco")[i].classList.remove("notteImg")
                }
            } else {
                document.body.classList.remove("standard")
                document.body.classList.add("notte")
                document.querySelector('h1').className = 'notteImg';
                for (let i = 0; i < 7; i++) {
                   document.getElementsByClassName("icone")[i].classList.add("notteImg")
                   document.getElementsByClassName("h2bianco")[i].classList.add("notteImg")
                }
            }
        })
    }

    function printDay(day_i, day_utc) {
        let giorno = new Date(day_utc * 1000);
        let day = giorno.getDay();

        dayname_id = "day" + day_i + "_name";
        switch (day) {
            case 0:
                document.getElementById(dayname_id).innerHTML = "Sunday";
                break;
            case 1:
                document.getElementById(dayname_id).innerHTML = "Monday";
                break;
            case 2:
                document.getElementById(dayname_id).innerHTML = "Tuesday";
                break;
            case 3:
                document.getElementById(dayname_id).innerHTML = "Wenesday";
                break;
            case 4:
                document.getElementById(dayname_id).innerHTML = "Thursday";
                break;
            case 5:
                document.getElementById(dayname_id).innerHTML = "Friday";
                break;
            case 6:
                document.getElementById(dayname_id).innerHTML = "Saturday";
                break;
            defaut:
                break;
        }
    }

    function iconaMeteo(day_i, meteo, meteoDescrip) { 
        dayicone_id = "day" + day_i + "_icone";
        if (meteo == "Clear"){
            document.getElementById(dayicone_id).src="/home/techmanager/Tech_Front/dmonrea-weatherforecast/Icons/sun.svg";
        } else if (meteo == "Snow"){
            document.getElementById(dayicone_id).src="/home/techmanager/Tech_Front/dmonrea-weatherforecast/Icons/snow.svg"
        } else if (meteo == "Clouds"){
            if (meteoDescrip == "Few clouds: 11-25%" || meteoDescrip == "Scattered clouds: 25-50%") {
            document.getElementById(dayicone_id).src="/home/techmanager/Tech_Front/dmonrea-weatherforecast/Icons/cloudy.svg"
            } else {
            document.getElementById(dayicone_id).src="/home/techmanager/Tech_Front/dmonrea-weatherforecast/Icons/clouds.svg"
            }
        } else {
            document.getElementById(dayicone_id).src="/home/techmanager/Tech_Front/dmonrea-weatherforecast/Icons/rain.svg";
        }
    }

    function deleteInfo() {
        document.body.classList.remove("giorno");
        document.body.classList.remove("notte");
        document.body.classList.add("standard");

        for (let i = 0; i < 7; i++) {
            document.getElementById("day" + i).classList.add("hidden");
            document.getElementById("day" + i + "_name").innerHTML = "";
            document.getElementById("day" + i + "_icone").src = "";
        }
    }

})