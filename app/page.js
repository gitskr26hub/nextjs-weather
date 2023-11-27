"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GoSun, GoMoon } from "react-icons/go";
import { GETBYLOCATION } from "./api/route";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
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
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log(position.coords.latitude, position.coords.longitude);
  //   });
  // }, []);



  function getLoc() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "denied") {
            Notification.requestPermission();
            alert("Please allow location access.");
            // Notification.requestPermission()
          } else {
            navigator.geolocation.watchPosition(async (position) => {
              console.log(position.coords.latitude, position.coords.longitude);
              const res = await GETBYLOCATION(
                position.coords.latitude,
                position.coords.longitude
              );
              setData(res);
            });
          }
        });
    } else {
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
        label: "Max Temp",
        data: data?.daily?.temperature_2m_max,
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Min Temp",
        data: data?.daily?.temperature_2m_min,
        borderColor: "blue",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  // console.log("data", data);

  return (
    <main className="min-h-screen items-center justify-between p-10">
      <div className="w-[90%] m-auto items-center justify-center flex flex-col">
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

      {data?.longitude && (
        <div>
          <motion.div
           initial={{ y: "-100%"  }}
                              animate={{ y: "0%",}}
                              transition={{  ease: "linear", type: "spring", stiffness: 100}}
           className="rounded-md shadow-xl p-4 mt-5 bg:animate-pulse-update bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 border-1 border-sky-500">
            <h3 className="text-center italic font-semibold  text-blue-900 text-xl ">
            CURRENT WEATHER{" "}
            </h3>
            <p className="text-black text-center">
              {" "}
              Date : {data?.current?.time?.split("T")[0]}
            </p>
            <p className="text-black text-center">
              Time : {data?.current?.time?.split("T")[1]}
            </p>

            <p className="flex items-center justify-center text-center">
              {" "}
              Temperature : {data?.current?.temperature_2m}°C &nbsp;{" "}
              {data?.current?.is_day == 1 ? <GoSun /> : <GoMoon />}
            </p>
            <p className="text-sm text-red-500  text-center">
              ***The data is not accurate, because of free services.{" "}
            </p>
          </motion.div>
          {/* ///////////////7 days day wise ////////////// */}
          <motion.div      initial={{ y:"50%"}}
                              animate={{ y: "0%",}}
                              transition={{  ease: "linear", delay: 2 ,type: "spring", stiffness: 20}}
           className="rounded-md shadow-xl p-4 mt-5  bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 border-1 border-sky-500 ">
            <h3 className="text-center italic font-semibold  text-blue-900 text-xl ">
              7 DAY'S ESTIMATION{" "}
            </h3>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Sunrise
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Sunset
                    </th>
                    <th scope="col" className="px-6 py-3 text-red-500">
                      Max. Temp.
                    </th>
                    <th scope="col" className="px-6 py-3 text-green-600">
                      Min. Temp.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.daily?.time?.map((item, i) => {
                    return (
                      <tr
                        key={data?.daily?.time[i]}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {data?.daily?.time[i]}
                        </th>
                        <td className="px-6 py-4 ">
                          {data.daily.sunrise[i]?.split("T")[1]} AM
                        </td>
                        <td className="px-6 py-4 ">
                          {data.daily.sunset[i]?.split("T")[1]} PM
                        </td>
                        <td className="px-6 py-4 text-red-400">
                          {data?.daily?.temperature_2m_max[i]} °C
                        </td>
                        <td className="px-6 py-4 text-green-300">
                          {data?.daily?.temperature_2m_min[i]} °C
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
              ***The data is not accurate, because of free services.{" "}
            </p>
          </motion.div>
        {/* ///////////////7 days hour wise data ////////////// */}







        </div>
      )}









































































































      
    </main>
  );
}
