// import axios from 'axios';
// import { useState } from 'react';
import React from 'react';
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
  // const [dateLabels2, setDateLabels2] = useState(['2026-01-01']);
  // const [dateLabels3, setDateLabels3] = useState([
  //   '2026-01-01',
  //   '2026-01-02',
  //   '2026-01-03',
  //   '2026-01-04',
  //   '2026-01-05',
  //   '2026-01-06',
  //   '2026-01-07',
  //   '2026-01-08',
  //   '2026-01-09',
  //   '2026-01-10',
  //   '2026-01-11',
  //   '2026-01-12',
  //   '2026-01-13',
  // ]);

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
    <div className="App">
      {/* <div>Line</div> */}
      <div>
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
      </div>
      <div>
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
      </div>
    </div>
  );
}

export default Home;
