import React,  { useState, useEffect } from "react";
import ThreadList from "../../components/ThreadList.js";
import axios from "axios";
import SideBar from "../../components/sideBar/index.js";

function Home() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios.get('/api/topics').then((response) => {
      setTopics(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }, []);
  return (
    <div className="p-5 flex flex-col-reverse lg:flex-row w-full justify-center">
      <div className="flex flex-1 flex-col">
        {topics.map((topic, index) => 
        (
          <ThreadList topic={topic} key={index}></ThreadList>
        ))}
      </div>
      <div className="flex flex-col w-full h-[300px] mb-3 lg:mb-0  lg:w-[300px] lg:h-auto bg-lime-500 shadow-xl lg:ml-5">
        <SideBar/>
      </div>
    </div>
  );
}

export default Home;
