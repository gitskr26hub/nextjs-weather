
// `https://api.open-meteo.com/v1/dwd-icon?latitude=${lati}&longitude=${longi}&current=temperature_2m,is_day&hourly=temperature_2m,relative_humidity_2m,cloud_cover,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
export async function GETBYLOCATION(lati, longi) {
    let res = await fetch(`https://api.open-meteo.com/v1/dwd-icon?latitude=${lati}&longitude=${longi}&current=temperature_2m,is_day&hourly=temperature_2m,relative_humidity_2m,cloud_cover,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`);
      res = await res.json();
      console.log(res);
      return res
}
