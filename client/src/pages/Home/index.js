import React,  { useState, useEffect } from "react";
import ThreadList from "../../components/ThreadList.js";
import axios from "axios";

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
    <div className="p-5 flex flex-1 w-full justify-center">
      <div className="flex flex-col">
        {topics.map((topic, index) => 
        (
          <ThreadList topic={topic} key={index}></ThreadList>
        ))}
      </div>
      <div className="w-[200px] h-auto bg-lime-500 shadow-xl ml-5"></div>
    </div>
  );
}

export default Home;
