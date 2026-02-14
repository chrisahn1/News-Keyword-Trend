// import axios from 'axios';
import { useState } from 'react';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';

import { Bar, Line } from 'react-chartjs-2';
// import sample1 from './datasample/sample1.json';

// import dates1 from './datasample/dates1.json';
// import sample2 from './datasample/sample2.json';
// import sample3 from './datasample/sample1.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  // const getNewsData = async () => {
  //   const res = await axios.get(
  //     'https://newsapi.org/v2/everything?q=trump&from=2026-02-02&to=2026-02-02&apiKey=af7a60b8e1274d7a903e6ccc7096c441'
  //   );
  //   setNewsData(res.data.totalResults);
  // };

  // useEffect(() => {
  //   getNewsData();
  // }, []);

  // const showResults = async () => {
  // };

  // const clearResults = async () => {
  // };

  return (
    // <div className="App">
    //   <div className="carousel">
    //     <div className="carouselItem">
    //       <Line
    //         data={{
    //           labels: ['2026-01-01', '2026-01-02', '2026-01-03'],
    //           datasets: [
    //             { label: ['CNN'], data: [900, 1240, 743] },
    //             { label: ['AP'], data: [2346, 1512, 1923] },
    //           ],
    //           backgroundColor: [
    //             'rgba(43, 63, 229, 0.8)',
    //             'rgba(250, 192, 19, 0.8)',
    //             'rgba(253, 135, 135, 0.8)',
    //           ],
    //           borderRadius: 5,
    //         }}
    //       />
    //     </div>
    //     <div>
    //       <Bar
    //         data={{
    //           labels: ['2026-01-01', '2026-01-02', '2026-01-03'],
    //           datasets: [
    //             { label: ['CNN'], data: [900, 1240, 743] },
    //             { label: ['AP'], data: [2346, 1512, 1923] },
    //           ],
    //           backgroundColor: [
    //             'rgba(43, 63, 229, 0.8)',
    //             'rgba(250, 192, 19, 0.8)',
    //             'rgba(253, 135, 135, 0.8)',
    //           ],
    //           borderRadius: 5,
    //         }}
    //       />
    //     </div>
    //   </div>
    // </div>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Line
          data={{
            labels: ['2026-01-01', '2026-01-02', '2026-01-03'],
            datasets: [
              { label: ['CNN'], data: [900, 1240, 743] },
              { label: ['AP'], data: [2346, 1512, 1923] },
            ],
            backgroundColor: [
              'rgba(43, 63, 229, 0.8)',
              'rgba(250, 192, 19, 0.8)',
              'rgba(253, 135, 135, 0.8)',
            ],
            borderRadius: 5,
          }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <Bar
          data={{
            labels: ['2026-01-01', '2026-01-02', '2026-01-03'],
            datasets: [
              { label: ['CNN'], data: [900, 1240, 743] },
              { label: ['AP'], data: [2346, 1512, 1923] },
            ],
            backgroundColor: [
              'rgba(43, 63, 229, 0.8)',
              'rgba(250, 192, 19, 0.8)',
              'rgba(253, 135, 135, 0.8)',
            ],
            borderRadius: 5,
          }}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;
