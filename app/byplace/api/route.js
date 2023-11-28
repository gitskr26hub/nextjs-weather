// var url =
// "https://api.openweathermap.org/data/2.5/forecast?q=delhi&APPID=&units=metric&lang=hi";
import Swal from "sweetalert2";

export async function GETBYPlace(Place, lang) {
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${Place}&APPID=${process.env.NEXT_PUBLIC_key}&units=metric&lang=${lang}`
  );
  res = await res.json();
  // console.log(res);
  if (res.cod != 404) {
    return res;
  } else {
    Swal.fire({
      icon: "error",
      title: "city not found!!",
    });
  }
}
