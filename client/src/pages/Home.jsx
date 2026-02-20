import { useState } from 'react';
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
import { Chart } from 'react-chartjs-2';
import CheckboxNews from '../components/CheckboxNews';
import DaysRange from '../components/DaysRange';

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
  const [newsListInput, setNewsListInput] = useState({});
  const [newsList, setNewsList] = useState([]);
  const [dayRange, setDayRange] = useState('1');
  const [graphType, setGraphType] = useState('line');
  const [data, setData] = useState({
    labels: [],
    datasets: [{ label: [], data: [], type: graphType }],
    borderRadius: 5,
  });
  const [datelist, setDates] = useState([]);

  const toggleLine = async () => {
    setGraphType('line');
  };

  const toggleBar = async () => {
    setGraphType('bar');
  };

  const showDates = async () => {
    setDates([]);
    // const dates = [];
    // const today = new Date(2026, 1, 4); //Feb 1, 2026
    const today = new Date();

    // Loop from 0 to 9 (past 10 days, inclusive of today)
    const size = Number(dayRange);
    for (let i = 0; i < size; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i); // Subtract i days
      // dates.push(date); // Push the date object
      console.log('date: ', date);
      setDates((datelist) => [date, ...datelist]);
    }

    // console.log('dates: ', dates);
  };
  console.log('datelist: ', datelist);
  console.log('dayrange: ', dayRange);

  const showData = async () => {
    // 'https://newsapi.org/v2/everything?q=trump&domains=techcrunch.com,thenextweb.com&from=2026-02-02&to=2026-02-02&apiKey=af7a60b8e1274d7a903e6ccc7096c441'
    const res = await fetch(
      'https://newsapi.org/v2/everything?q=trump&from=2026-02-01&to=2026-02-01&apiKey=af7a60b8e1274d7a903e6ccc7096c441'
    );
    const result = await res.json();
    setData({
      labels: ['2026-01-01', '2026-01-02', '2026-01-03'],
      datasets: [
        { label: ['CNN'], data: [900, 1240, 743] },
        { label: ['AP'], data: [result.totalResults, 1512, 1923] },
      ],
      backgroundColor: [
        'rgba(43, 63, 229, 0.8)',
        'rgba(250, 192, 19, 0.8)',
        'rgba(253, 135, 135, 0.8)',
      ],
      borderRadius: 5,
    });
  };

  const clearData = async () => {
    setData({
      labels: [],
      datasets: [{ label: [], data: [], type: graphType }],
      borderRadius: 5,
    });
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('name and value: ', name, ': ', value);
    setNewsListInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmitNews = (event) => {
    //check if news value is false and if it exists in list, if so then remove it from list
    // Object.keys(newsListInput).length
    {
      Object.keys(newsListInput).map((key) => {
        if (newsListInput[key] === true) {
          console.log('key: ', key);
          setNewsList((list) => [...list, key]);
        }
      });
    }
    console.log('newsList: ', newsList);
    console.log('size: ', dayRange);
    event.preventDefault();
  };

  return (
    <div className="graphs">
      <div className="graph">
        <Chart className="chart" type={graphType} data={data} />
        <div className="newslist">
          <DaysRange dayRange={dayRange} setDayRange={setDayRange}></DaysRange>
          <CheckboxNews
            newsListInput={newsListInput}
            handleChange={handleChange}
            handleSubmitNews={handleSubmitNews}></CheckboxNews>
        </div>
      </div>
      <div>
        <button onClick={toggleLine}>Line</button>
        <button onClick={toggleBar}>Bar</button>
      </div>
      <div>
        <button onClick={showData}>Display</button>
        <button onClick={clearData}>Clear</button>
      </div>
      <div>
        <button onClick={showDates}>Dates</button>
      </div>
    </div>
  );
}

export default Home;
