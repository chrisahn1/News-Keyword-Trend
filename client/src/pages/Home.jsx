import { useState } from 'react';
import React from 'react';
import CharLimit from '../modals/ModalCharLimit';
import RequestLimit from '../modals/ModalRequestLimit';
import MinCheckbox from '../modals/ModalMinCheckbox';
import { url } from '../configURL/configURL';
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
  const [newsCheckboxList, setNewsCheckboxList] = useState([
    { name: 'apnews.com', value: false },
    { name: 'cnn.com', value: false },
    { name: 'foxnews.com', value: false },
    { name: 'bbc.com', value: false },
  ]);
  const colors = [
    'rgba(43, 63, 229, 0.8)',
    'rgba(250, 192, 19, 0.8)',
    'rgba(253, 135, 135, 0.8)',
    'rgba(255, 159, 64, 0.2)',
  ];
  const [dayRange, setDayRange] = useState('1');
  const [graphType, setGraphType] = useState('line');
  const [lineBarData, setLineBarData] = useState({
    labels: [],
    datasets: [{}],
    backgroundColor: colors,
    borderRadius: 5,
  });
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [{ label: 'Total', data: [] }],
    backgroundColor: colors,
    hoverOffset: 2,
  });
  const [dataResult, setDataResult] = useState({
    labels: [],
    datasets: [{}],
    backgroundColor: colors,
    borderRadius: 5,
  });

  const [showCharlimitModal, setCharlimitModal] = useState(false);
  const [showRequestlimitModal, setRequestlimitModal] = useState(false);
  const [showMincheckboxModal, setMincheckboxModal] = useState(false);

  const toggleCharlimitModal = async () => {
    setCharlimitModal(!showCharlimitModal);
  };

  const toggleRequestlimitModal = async () => {
    setRequestlimitModal(!showRequestlimitModal);
  };

  const toggleMincheckboxModal = async () => {
    setMincheckboxModal(!showMincheckboxModal);
  };

  const toggleLine = async () => {
    setDataResult(lineBarData);
    setGraphType('line');
  };

  const toggleBar = async () => {
    setDataResult(lineBarData);
    setGraphType('bar');
  };

  const togglePie = async () => {
    setDataResult(pieData);
    setGraphType('pie');
  };

  const fetchData = async (input, newsdomain, date) => {
    // const response = await fetch(
    //   `https://newsapi.org/v2/everything?q=${input}&domains=${newsdomain}&from=${date}&to=${date}&apiKey=af7a60b8e1274d7a903e6ccc7096c441`
    // );
    const response = await fetch(
      `${url}/api/news?q=${input}&domains=${newsdomain}&from=${date}&to=${date}`
    );
    const result = await response.json();
    console.log('result: ', result);
    return result;
  };

  const showData = async () => {
    clearChartData();
    //APPEND LIST NEWS WITH NEWS CHECKBOX THATS TRUE
    let news = [];
    newsCheckboxList.map((newsoutlet) =>
      newsoutlet.value === true ? news.push(newsoutlet.name) : newsoutlet
    );

    try {
      //ENSURE REQUEST LIMIT ERROR, USER TEXT INPUT ERROR(EMPTY OR INVALID), CHECKBOX EMPTY ERROR
      if (userInput.length > 15 || userInput.length < 1) {
        toggleCharlimitModal();
      } else if (/[^A-Za-z]/.test(userInput) === true) {
        toggleCharlimitModal();
      } else if (newsCheckboxList.every(({ value }) => !value) === true) {
        toggleMincheckboxModal();
      } else {
        const today = new Date();

        const size = Number(dayRange);

        //SIZE = NUMBER OF DATES IN LABELS
        for (let i = size - 1; i >= 0; i--) {
          const fullDate = dateDisplay(today, i);
          setDataResult((dataresult) => ({
            ...dataresult,
            labels: [...dataresult.labels, fullDate],
          }));
          setLineBarData((dataresult) => ({
            ...dataresult,
            labels: [...dataresult.labels, fullDate],
          }));
        }
        // ITERATING THROUGH NEWS OUTLET
        // N = NUMBER OF NEWS OUTLETS
        let newsOutlets = [];
        let totalArticles = [];
        outerLoop: for (let n = 0; n < news.length; n++) {
          let datalist = [];
          if (!newsOutlets.includes(news[n])) {
            newsOutlets.push(news[n]);
          }
          // console.log('newsOutlet: ', newsOutlets);
          // ITERATING THROUGH DATES
          for (let i = size - 1; i >= 0; i--) {
            const fullDate = dateDisplay(today, i);
            const res = await fetchData(userInput, news[n], fullDate);
            if (res.status === 'error') {
              if (res.code === 'rateLimited' || res.code === '429') {
                clearData();
                toggleRequestlimitModal();
                break outerLoop;
              }
            } else {
              datalist.push(res.totalResults);
              // newsOutlets
            }
          }
          totalArticles.push(
            datalist.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            )
          );
          // console.log('pie test data: ', newsOutlets);
          if (graphType === 'pie') {
            setDataResult({
              labels: newsOutlets,
              datasets: [{ label: 'Total', data: totalArticles }],
              backgroundColor: colors,
              hoverOffset: 2,
            });
          } else {
            setDataResult((dataresult) => ({
              ...dataresult,
              datasets: [
                ...dataresult.datasets,
                {
                  label: [news[n]],
                  data: datalist,
                  borderColor: colors[n % colors.length],
                  backgroundColor: colors[n % colors.length],
                  tension: 0.3,
                },
              ],
            }));
          }
          setLineBarData((dataresult) => ({
            ...dataresult,
            datasets: [
              ...dataresult.datasets,
              { label: [news[n]], data: datalist },
            ],
          }));
        }
        setPieData({
          labels: newsOutlets,
          datasets: [{ label: 'Total', data: totalArticles }],
          backgroundColor: colors,
          hoverOffset: 2,
        });
      }
    } catch (error) {
      console.error('News fetch error:', error);
    }
  };

  const dateDisplay = (today, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i - 1); //current date won't have any data until tomorrow so it's better for yesterday to be the last day
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');
    const paddedYear = year.toString();
    const fullDate = paddedYear + '-' + paddedMonth + '-' + paddedDay;
    return fullDate;
  };
  // console.log(dataResult);
  // console.log('newsCheckboxList: ', newsCheckboxList);
  const clearData = () => {
    // e.preventDefault();
    //CLEAR USER TEXT INPUT, CHECKBOXES, RESET DAY RANGE TO 1, RESET GRAPH TYPE TO LINE
    setUserInput('');
    setNewsCheckboxList([
      { name: 'apnews.com', value: false },
      { name: 'cnn.com', value: false },
      { name: 'foxnews.com', value: false },
      { name: 'bbc.com', value: false },
    ]);
    setDayRange('1');
    setGraphType('line');
    clearChartData();
  };

  const clearChartData = () => {
    setDataResult({
      labels: [],
      datasets: [{}],
      backgroundColor: colors,
      borderRadius: 5,
    });
    setLineBarData({
      labels: [],
      datasets: [{}],
      backgroundColor: colors,
      borderRadius: 5,
    });
    setPieData({
      labels: [],
      datasets: [{ label: 'Total', data: [] }],
      backgroundColor: colors,
      hoverOffset: 2,
    });
  };

  const handleChange = (e) => {
    const target = e.target;
    // const targetvalue =
    //   target.type === 'checkbox' ? target.checked : target.value;
    const targetname = target.name;

    const updatedNewsCheckboxes = newsCheckboxList.map((news) =>
      news.name === targetname ? { ...news, value: !news.value } : news
    );
    setNewsCheckboxList(updatedNewsCheckboxes);
  };

  return (
    <div className="graphs">
      <h2>News Keyword Trend</h2>
      <div className="graph">
        <div className="chartdisplay">
          <Chart
            className="chart"
            type={graphType}
            data={dataResult}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div className="newslist">
          <div className="checkboxnews-container">
            <label>Select News Outlet:</label>
            {newsCheckboxList.map((news) => {
              return (
                <label key={news.name}>
                  <input
                    type="checkbox"
                    name={news.name}
                    checked={news.value}
                    onChange={handleChange}
                  />
                  {news.name}
                </label>
              );
            })}
          </div>
          <DaysRange dayRange={dayRange} setDayRange={setDayRange}></DaysRange>
        </div>
      </div>
      <div className="chartbuttons">
        <button className="buttonchar" onClick={toggleLine}>
          Line
        </button>
        <button className="buttonchar" onClick={toggleBar}>
          Bar
        </button>
        <button className="buttonchar" onClick={togglePie}>
          Pie
        </button>
      </div>
      <div className="inputbuttons">
        <input
          id="userinput"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type here..."
        />
        <button className="buttonchar" onClick={showData}>
          Display
        </button>
        <button className="buttonchar" onClick={clearData}>
          Clear
        </button>
      </div>
      <div>
        <CharLimit
          isOpen={showCharlimitModal}
          handleClose={toggleCharlimitModal}></CharLimit>
        <RequestLimit
          isOpen={showRequestlimitModal}
          handleClose={toggleRequestlimitModal}></RequestLimit>
        <MinCheckbox
          isOpen={showMincheckboxModal}
          handleClose={toggleMincheckboxModal}></MinCheckbox>
      </div>
    </div>
  );
}

export default Home;
