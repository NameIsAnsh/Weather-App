// Function to generate 14 days of weather data based on one day's data
export function generate14DayWeatherData(weatherData) {
    // Extract the first day's data
    const oneDayData = weatherData.days[0];
  
    // Array to store the 14 days of data
    const fourteenDayData = [];
  
    // Loop to create 14 days of data
    for (let i = 0; i < 14; i++) {
      // Create a new date by adding 'i' days to the original date
      const originalDate = new Date(oneDayData.datetime);
      const newDate = new Date(originalDate);
      newDate.setDate(originalDate.getDate() + i);
  
      // Format the new date as 'YYYY-MM-DD'
      const newDatetime = newDate.toISOString().split('T')[0];
  
      // Create a copy of the original day's data and update the datetime
      const newDayData = { ...oneDayData };
      newDayData.datetime = newDatetime;
      newDayData.datetimeEpoch = Math.floor(newDate.getTime() / 1000); // Convert to epoch time
  
      // Add the new day's data to the array
      fourteenDayData.push(newDayData);
    }
  
    // Return the 14-day data
    console.log(fourteenDayData, "14 days data");
    return fourteenDayData;
  }
  
  // Example usage
  
  
