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
  const [userInput, setUserInput] = useState('');
  const [newsCheckboxList, setNewsCheckboxList] = useState({});
  const [dayRange, setDayRange] = useState('1');
  const [graphType, setGraphType] = useState('line');
  const [data, setData] = useState({
    labels: [],
    datasets: [{ label: [], data: [], type: graphType }],
    borderRadius: 5,
  });

  const toggleLine = async () => {
    setGraphType('line');
  };

  const toggleBar = async () => {
    setGraphType('bar');
  };

  const showData = async () => {
    // console.log('input: ', userInput);
    // console.log('newsCheckboxList: ', newsCheckboxList);
    // console.log('dayrange: ', dayRange);

    //ENSURE REQUEST LIMIT ERROR, USER TEXT INPUT ERROR(EMPTY OR INVALID), CHECKBOX EMPTY ERROR

    let stringNewsList = '';

    Object.keys(newsCheckboxList).map((key) => {
      if (newsCheckboxList[key] === true) {
        stringNewsList += key + ',';
      }
    });

    const domainString = stringNewsList.slice(0, -1);

    const today = new Date();

    const size = Number(dayRange);
    for (let i = size - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();

      const paddedMonth = month.toString().padStart(2, '0');
      const paddedDay = day.toString().padStart(2, '0');
      const paddedYear = year.toString();
      const fullDate = paddedYear + '-' + paddedMonth + '-' + paddedDay;
      console.log(
        `?q=${userInput}&domains=${domainString}&from=${fullDate}&to=${fullDate}&`
      );
    }
    // 'https://newsapi.org/v2/everything?q=trump&domains=techcrunch.com,thenextweb.com&from=2026-02-02&to=2026-02-02&apiKey=af7a60b8e1274d7a903e6ccc7096c441'
    // const res = await fetch(
    //   'https://newsapi.org/v2/everything?q=trump&from=2026-02-01&to=2026-02-01&apiKey=af7a60b8e1274d7a903e6ccc7096c441'
    // );
    // const result = await res.json();
    // setData({
    //   labels: ['2026-01-01', '2026-01-02', '2026-01-03'],
    //   datasets: [
    //     { label: ['CNN'], data: [900, 1240, 743] },
    //     { label: ['AP'], data: [result.totalResults, 1512, 1923] },
    //   ],
    //   backgroundColor: [
    //     'rgba(43, 63, 229, 0.8)',
    //     'rgba(250, 192, 19, 0.8)',
    //     'rgba(253, 135, 135, 0.8)',
    //   ],
    //   borderRadius: 5,
    // });
  };

  const clearData = async () => {
    //CLEAR USER TEXT INPUT, CHECKBOXES, RESET DAY RANGE TO 1, RESET GRAPH TYPE TO LINE
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
    setNewsCheckboxList((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="graphs">
      <div className="graph">
        <Chart className="chart" type={graphType} data={data} />
        <div className="newslist">
          <DaysRange dayRange={dayRange} setDayRange={setDayRange}></DaysRange>
          <CheckboxNews
            newsCheckboxList={newsCheckboxList}
            handleChange={handleChange}></CheckboxNews>
        </div>
      </div>
      <div>
        <button onClick={toggleLine}>Line</button>
        <button onClick={toggleBar}>Bar</button>
      </div>
      <div>
        <input
          id="userinput"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type here..."
        />
        <button onClick={showData}>Display</button>
        <button onClick={clearData}>Clear</button>
      </div>
    </div>
  );
}

export default Home;
