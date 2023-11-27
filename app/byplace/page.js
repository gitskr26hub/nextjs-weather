"use client";
import React, { useEffect, useRef } from "react";
import { GETBYPlace } from "./api/route";
import { motion } from "framer-motion";
import Image from "next/image";
import Swal from "sweetalert2";
import { IoMdCloseCircle } from "react-icons/io";

const page = () => {
  const [city, setcity] = React.useState("");
  const [Lang, setLang] = React.useState("en");
  const [data, setData] = React.useState();
  const [list, setList] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [modaldata, setModaldata] = React.useState({});
  const boxref = useRef(null);

  async function Search() {
    setData()
    if (city && Lang) {
      setData(await GETBYPlace(city, Lang));
    } else {
      Swal.fire({
        title: "Please Enter city!",
      });
    }
  }

  useEffect(() => {
    var date = data?.list[0]?.dt_txt?.split(" ")[0];

    var updatelist = [];
    var obj = { date: "", arr: [] };
    data?.list?.forEach((item, i) => {
      if (item.dt_txt.split(" ")[0] == date) {
        obj.date = date;
        obj.arr.push(item);
      } else {
        updatelist.push(obj);
        obj = { date: "", arr: [] };
        date = item.dt_txt.split(" ")[0];
        obj.arr.push(item);
        // console.log(item.dt_txt.split(" ")[0])
      }
    });
    setList(updatelist);
  }, [data?.cod == 200]);
  console.log(list);

  useEffect(() => {
    window.onclick = (event) => {
      if (event.target.contains(boxref.current)
        && event.target !== boxref.current) {     
        // console.log(`You clicked Outside the box!`);
        setOpenModal(false)
      } else {     
       
        // console.log(`You clicked Inside the box!`);
      }
    }
}, []);




  return (
    <main className="min-h-screen items-center justify-between p-8 bg-gradient-to-t from-blue-100 
    via-blue-300 to-blue-500">
      <div
        className="bg-[url('/badal.gif')] w-[95%] m-auto items-center justify-center flex flex-col  p-5 rounded-lg  shadow-xl border-2 border-2-gray">
        <input
          type="text"
          value={city}
          onChange={(e) => setcity(e.target.value)}
          placeholder="Enter city name here ....."
          className="bg-opacity-5 border border-blue-300  text-md rounded-lg text-black  block w-[90%] md:w-[30%] p-2.5  "
        />
        <button
          className="button-29 bg-slate-300 mt-3"
          onClick={() => Search()}>
          Submit
        </button>
        <div className="text-white">
          {data?.cod == 200 && (
            <div>
              <p className="text-center">CURRENT WEATHER</p>
              <div className="text-center">
                <div>City : {data?.city?.name}</div>
                <div>country : {data?.city?.country}</div>
                <div></div>
              </div>

              {list?.length > 0 &&
                list.map((item, i) => {
                  const specificDate = new Date(item.date);
                  const monthIndex = specificDate.getMonth();
                  const dayIndex = specificDate.getDay();
                  const currentMonth = monthNames[monthIndex];
                  const currentDay = dayNames[dayIndex];
                  return (
                    <motion.div
                      initial={{ x: i % 2 == 0 ? "100%" : "-100%" }}
                      animate={{ x: "0%" }}
                      transition={{ delay: 1 }}
                      key={item.date}
                      style={{ border: "1px solid gray" }}
                      className="mt-5 shadow-xl rounded-md 
                      bg-[url('/badal.gif')]
                      
                      ">
                      <p
                        className="italic backdrop-blur-md
                      p-2 shadow-md text-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-violet-400 via-violet-600 to-sky-900">
                        {item?.date.split("-")[2]},{currentMonth},
                        {item?.date.split("-")[0]},{currentDay}
                      </p>

                      <div
                        className="justify-between p-2 bg-transparent
                overflow-x-hidden gap-2 md:flex md:flex-wrap sm:justify-center sm:grid sm:grid-cols-1  ">
                        {item?.arr?.map((pro, index) => {
                          return (
                            <motion.div
                              onClick={() => {
                                setOpenModal(true);
                                {
                                  setModaldata({
                                    date:`${item?.date.split("-")[2]}, ${currentMonth}`,
                                    currentDay:currentDay,
                                    Time: pro.dt_txt.split(" ")[1],
                                    temp:pro.main.temp,
                                    temp_min: pro.main.temp_min,
                                    temp_max: pro.main.temp_max,
                                    humidity: pro.main.humidity,
                                    weather: pro.weather[0].description,
                                    img: `/assets/icons/${pro.weather[0].icon}.png`,
                                    wind: pro.wind.speed,
                                    clouds: pro.clouds.all,
                                  });
                                }
                              }}
                              initial={{ x: "100%" }}
                              animate={{ x: "0%" }}
                              key={pro.dt_txt.split(" ")[1] + index}
                              style={{ border: "1px solid Aquamarine" }}
                              className="p-2 rounded-md 
                              backdrop-blur-[2px] bg-blue/50  text-center shadow-xl sm:mt-2 text-white text-sm cursor-pointer ">
                              <Image
                                src={`/assets/icons/${pro.weather[0].icon}.png`}
                                alt={pro.weather[0].description}
                                width="60"
                                height="60"
                                className="ml-[25%]"
                              />
                              <p>Time : {pro.dt_txt.split(" ")[1]}</p>
                              <p>Temp : {pro.main.temp} °C</p>
                              <a className="underline text-xs text-orange-400 ">
                                Details
                              </a>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          )}

          {openModal ? (
            <>
              <div  className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100 outline-none focus:outline-none  max-h-full sm:px-1
              w-[100vw] h-[100vh] backdrop-blur-sm bg-blue/50
              ">
                <div
                  className="relative w-auto 
                  
                  ">
                  {/* <div className="flex justify-center">
                    
                      <div className="card  min-w-sm max-w-sm border border-gray-100  transition-shadow test  shadow-lg hover:shadow-shadow-xl w-full  text-purple-50 rounded-md">
                        <h2 className="text-md mb-2 px-4 pt-4">
                          <div className="flex justify-between">
                            <div className="badge relative top-0">
                              <span className="mt-2 py-1 h-12px text-md font-semibold w-12px  rounded right-1 bottom-1 px-4">
                                {data?.city?.name}
                              </span>
                             
                            </div>
                            <span className="text-lg font-bold ">
                              {modaldata.Time}
                            </span>
                            <button
                        className="rounded-md bg-red-700 text-white font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setOpenModal(false)}>
                        Close
                      </button>
                          </div>
                        </h2>

                        <div className="flex items-center p-4">
                          <div className="flex justify-center items-center w-96">
                            <Image
                              src={modaldata.img}
                              width="80"
                              height="80"
                              alt="icon"
                            />
                          </div>
                        </div>
                        <div className="text-md pt-4 pb-4 px-4">
                          <div className="flex justify-between items-center">
                            <div className="space-y-2">
                              <span className="flex space-x-2 items-center">
                                <span>wind speed: {modaldata.wind}km/h</span>
                              </span>
                              <span className="flex space-x-2 items-center">
                                <span>32%</span>
                              </span>
                            </div>
                            <div>
                              <h1 className="text-lg">
                                Max Temp : {modaldata.temp_max}°C{" "}
                              </h1>
                              <h1 className="text-lg">
                                Min Temp : {modaldata.temp_min}°C{" "}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}

                
                    <div ref={boxref} className="flex flex-wrap  lg:w-auto 
                    w-full mt-10 lg:mt-50 lg:px-5  justify-center container  mx-auto">
                      <div className="w-full lg:w-1/2 flex rounded-lg bg-auto bg-[url('https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80')]">
                        <div className="rounded-lg py-6 pl-8 pr-32 w-full bg-blue-400 opacity-90 text-white">
                          <div className="">
                            <h2 className="font-bold text-3xl leading-none pb-1">
                            {modaldata?.currentDay}
                            </h2>
                          
                          
                            <h3 className="leading-none pb-2 pl-1">{modaldata?.date}</h3>
                            <p className="flex aling-center opacity-75">
                            {data?.city?.name}, {data?.city?.country} {modaldata.Time}
                            </p>
                          </div>
                          <Image src={modaldata.img}
                           alt="icon" width='100' height='100'
                               />
                          <div>
                            <strong className="leading-none text-6xl block font-weight-bolder">
                              {modaldata.temp}ºC
                            </strong>
                            <b className="text-xl  font-bold w-[100%]">
                            
                            {modaldata.weather}
                            
                            </b>
                          </div>
                        </div>
                      </div>

                      

                      <div className="w-full lg:w-1/2 flex ml-0">
                        <div className="lg:my-3 bg-gray-800 text-white p-8 lg:rounded-r-lg w-full">
                          <div className="flex justify-between  mb-4 w-full">
                            <div className="w-auto font-bold uppercase text-90">
                              Max Temp
                            </div>
                            <div className="w-auto text-right">{modaldata.temp_max}ºC </div>
                          </div>
                          <div className="flex justify-between  mb-4 w-full">
                            <div className="w-auto font-bold uppercase text-90">
                              Min Temp
                            </div>
                            <div className="w-auto text-right">{modaldata.temp_min}ºC </div>
                          </div>
                          <div className="flex justify-between  mb-4 w-full">
                            <div className="w-auto font-bold uppercase text-90">
                              Humidity
                            </div>
                            <div className="w-auto text-right">{modaldata.humidity} %</div>
                          </div>
                          <div className="flex justify-between  mb-4 w-full">
                            <div className="w-auto items-center justify-center font-bold uppercase text-90 flex">
                              Wind <Image src={'/assets/icons/50d.png'} width='25' height='25' alt='air'/>
                            </div>
                            <div className="w-auto text-right">{modaldata.wind} km/h</div>
                          </div>
                          <div className="flex justify-between  mb-8 w-full">
                            <div className="w-auto items-center justify-center font-bold uppercase text-90 flex">
                            Clouds<Image src={'/assets/icons/04d.png'} width='25' height='25' alt='air'/>
                            </div>
                            <div className="w-auto text-right">{modaldata.clouds} %</div>
                          </div>
                          
                        </div>
                      </div>


                      <button
                        className="absolute  right-1   rounded-md bg-red-700 text-white font-bold uppercase p-2  outline-none focus:outline-none  text-3xl"
                        type="button"
                        onClick={() => setOpenModal(false)}>
                       <IoMdCloseCircle/>
                      </button>





                    </div>
                  </div>
                </div>
             
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default page;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
