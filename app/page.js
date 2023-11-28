"use client";

import Image from "next/image";
import { Suspense, useEffect, useState,useContext } from "react";
import { GoSun, GoMoon } from "react-icons/go";
import { GETBYLOCATION } from "./api/route";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Loading from "./loading";
import {monthNames,dayNames,dayNamesHi,monthNamesHi} from "@/components/MonthDay"
import { Lang_data } from "@/context/context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Temperature Line Graph",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export default function Home() {
  const [data, setData] = useState();
  const [labels, setLables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Lang, setLang] = useState("");
  const {Language}=useContext(Lang_data)
 
  useEffect(()=>{
    // console.log(Language)
    setLang(Language)
  },[Language])


  function getLoc() {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "denied") {
            Notification.requestPermission();
            alert("Please allow location access.");
            setLoading(false);
            // Notification.requestPermission()
          } else {
            navigator.geolocation.watchPosition(async (position) => {
              // console.log(position.coords.latitude, position.coords.longitude);
              const res = await GETBYLOCATION(
                position.coords.latitude,
                position.coords.longitude
              );
              setData(res);
              setLoading(false);
            });
          }
        });
    } else {
      setLoading(false);
      alert("Geolocation is not supported in your browser.");
    }
  }

  useEffect(() => {
    setLables(data?.daily?.time);
  }, [data]);

  const DATA = {
    labels,
    datasets: [
      {
        label:Lang=="en"?"Max Temp":"अधिकतम तापमान",
        data: data?.daily?.temperature_2m_max,
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: Lang=="en"?"Min Temp":"न्यूनतम  तापमान",
        data: data?.daily?.temperature_2m_min,
        borderColor: "blue",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  // console.log("data", data);
 

  return (
    <main className="min-h-screen items-center justify-between lg:p-10 md:p-10 sm:p-1 sm:w-[98%] sm:m-auto">
      
      <div className="w-[80%] m-auto items-center justify-center flex flex-col">
     
        <Image
          className="transition duration-500 ease-in-out   transform hover:translate-y-0 hover:scale-110 ..."
          src={"/earth.gif"}
          width={"100"}
          height={"100"}
          alt="earth"
        />
        <button
          className="button-29 bg-[url('/badal.jpg')]"
          onClick={() => getLoc()}>
          Click Here to Get Location
        </button>
      
      </div>

{!data?.longitude && loading && <div className="pt-10"> <Loading /></div>

}


      <Suspense fallback={<Loading />}>
        {data?.longitude && (
          <div>
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{ ease: "linear", type: "spring", stiffness: 100 }}
              className="rounded-md shadow-xl p-10  mt-5 bg:animate-pulse-update bg-gradient-to-r from-blue-200 via-blue-300 to-blue-500 border-1 border-sky-500 sm:p-1 sm:w-[98%] m-auto">
              <h3 className="text-center italic font-bold  text-blue-900 text-xl mt-3">
                {Lang=="en"?"CURRENT WEATHER":"वर्तमान मौसम"}{" "}
              </h3>
              <p className="text-black text-center">
                {" "}
                {Lang=="en"?"Date":"तारीख"} : <span className="font-semibold">{
                  data?.current?.time?.split("T")[0]?.split("-")[2]+" "+
                  monthNames[new Date(data?.current?.time?.split("T")[0])?.getMonth()]+" "+
                  data?.current?.time?.split("T")[0]?.split("-")[0]}</span>
              </p>
            

              <p className="flex items-center justify-center text-center">
                {" "}
                {Lang=="en"?"Temperature":"तापमान"} : <span className="font-semibold flex items-center justify-center"> {data?.current?.temperature_2m}°C &nbsp;{" "}
                {data?.current?.is_day == 1 ? <GoSun /> : <GoMoon />}</span>
              </p>
              <p className="text-black text-center">
                {" "}
                {Lang=="en"?"Day":"दिन"} : <span className="font-semibold">
                  {
                 Lang=="en"? dayNames[new Date(data?.current?.time?.split("T")[0])?.getDay()]:dayNamesHi[new Date(data?.current?.time?.split("T")[0])?.getDay()]
                  }</span>
              </p>
              <p className="text-black text-center">
                {Lang=="en"?"Time":"समय"} : <span className="font-semibold">{data?.current?.time?.split("T")[1]}</span>
              </p>
              <p className="text-sm text-red-500  text-center mb-3">
                ***{Lang=="en"?"The data is not accurate, because of free services":"मुफ़्त सेवाओं के कारण डेटा सटीक नहीं है"}.
              </p>
            </motion.div>
            {/* ///////////////7 days day wise ////////////// */}
            <motion.div
              initial={{ y: "50%" }}
              animate={{ y: "0%" }}
              transition={{
                ease: "linear",
                delay: 2,
                type: "spring",
                stiffness: 20,
              }}
              className="rounded-md shadow-xl p-4 mt-5  bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 border-1 border-sky-500 ">
              <h3 className="text-center italic font-semibold  text-blue-900 text-xl ">
                {Lang=="en"?"7 DAY'S ESTIMATION":"7 दिन का अनुमान"}
              </h3>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs  uppercase bg-gray-700 text-white">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                      {Lang=="en"?"Date":"समय"}
                      </th>
                      <th scope="col" className="px-6 py-3 text-red-500">
                      {Lang=="en"?"Max. Temp.":"अधिकतम तापमान"}
                      </th>
                      <th scope="col" className="px-6 py-3 text-green-600">
                      {Lang=="en"?"Min. Temp.":"न्यूनतम  तापमान"}
                      </th>
                      <th scope="col" className="px-6 py-3 ">
                      {Lang=="en"?"Sunrise":"सूर्योदय"}
                      </th>
                      <th scope="col" className="px-6 py-3 ">
                      {Lang=="en"?"Sunset":"सूर्यास्त"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.daily?.time?.map((item, i) => {
                      const specificDate = new Date(data?.daily?.time[i]);
                      const monthIndex = specificDate.getMonth();
                      const dayIndex = specificDate.getDay();
                      const currentMonth = Lang==="en"? monthNames[monthIndex]:monthNamesHi[monthIndex];
                      const currentDay = Lang==="en"?dayNames[dayIndex]:dayNamesHi[dayIndex];
                      return (
                        <tr
                          key={data?.daily?.time[i]}
                          className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {data?.daily?.time[i].split("-")[2]}, {currentMonth.slice(0,3)}
                          </th>
                          <td className="px-6 py-4 text-red-500">
                            {data?.daily?.temperature_2m_max[i]} °C
                          </td>
                          <td className="px-6 py-4 text-green-500">
                            {data?.daily?.temperature_2m_min[i]} °C
                          </td>
                          <td className="px-6 py-4 ">
                            {data.daily.sunrise[i]?.split("T")[1]} AM
                          </td>
                          <td className="px-6 py-4 ">
                            {data.daily.sunset[i]?.split("T")[1]} PM
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* ///////////////////////show line graph/////////// */}
              <div className="mt-5 shadow-xl rounded-md p-2  bg-white text-black-800">
                {DATA?.labels?.length > 0 && (
                  <Line options={options} data={DATA} />
                )}
              </div>

              <p className="text-sm text-red-700 mt-4">
                ***{Lang=="en"?"The data is not accurate, because of free services":"मुफ़्त सेवाओं के कारण डेटा सटीक नहीं है"}.
              </p>
            </motion.div>
            {/* ///////////////7 days hour wise data ////////////// */}
          </div>
        )}
      </Suspense>
    </main>
  );
}
