import React, { useState, useRef, useCallback } from "react";
import FetchMoreData from "./components/FetchMoreData";

import "./App.css";

function App() {
  const [pageNum, setPageNum] = useState(1);

  const { loading, cnnList, hasMore } = FetchMoreData(pageNum);

  const observer = useRef();
  const lastCnnElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prevPageNum) => prevPageNum + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <h1>🚀💥CNN Archive💥🚀</h1>
      <hr />
      {cnnList.map((val, key) => {
        const sliceDate = val.date.slice(0, 10);
        if (val.imgalt === "undefined") {
          val.imgalt = "No image for this article";
          val.imglink = "#";
        }
        if (cnnList.length === key + 1) {
          return (
            <div ref={lastCnnElementRef} key={key}>
              <img src={val.imglink} alt={val.imgalt} />
              <p>
                {sliceDate} <a href={val.link}>{val.headline}</a>
              </p>
            </div>
          );
        } else {
          return (
            <div key={key}>
              <img src={val.imglink} alt={val.imgalt} />
              <p>
                {sliceDate} <a href={val.link}>{val.headline}</a>
              </p>
            </div>
          );
        }
      })}
      <div>{loading && "Loading..."}</div>
    </>
  );
}

export default App;
