document.addEventListener("DOMContentLoaded", () => {
  const URL =
    "https://api.openweathermap.org/data/2.5/weather?q=tooele&units=imperial&appid=1c9b170e57135ca5d6057491fab55c7c";

  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      document.getElementById("current-temp").textContent = data.main.temp;
      document.getElementById("current-desc").textContent =
        data.weather[0].description;
      document.getElementById("current-humid").textContent = data.main.humidity;
      document.getElementById("current-windSpeed").textContent =
        data.wind.speed;

      // Wind chill calculation
      const t = data.main.temp;
      const s = data.wind.speed;
      let chill = "N/A";

      if (t <= 50 && s >= 3.0) {
        chill = (
          35.74 +
          0.6215 * t -
          35.75 * Math.pow(s, 0.16) +
          0.4275 * t * Math.pow(s, 0.16)
        ).toFixed(2);
      }

      document.getElementById("current-windChill").textContent = chill;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
