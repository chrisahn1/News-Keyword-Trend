import { useState } from 'react';
import React from 'react';
import CharLimit from '../modals/ModalCharLimit';
import RequestLimit from '../modals/ModalRequestLimit';
import MinCheckbox from '../modals/ModalMinCheckbox';
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
  const [dayRange, setDayRange] = useState('1');
  const [graphType, setGraphType] = useState('line');
  // const [lineBarData, setLineBarData] = useState({
  //   labels: [],
  //   datasets: [{}],
  //   backgroundColor: [
  //     'rgba(43, 63, 229, 0.8)',
  //     'rgba(250, 192, 19, 0.8)',
  //     'rgba(253, 135, 135, 0.8)',
  //     'rgba(255, 159, 64, 0.2)',
  //   ],
  //   borderRadius: 5,
  // });
  // const [pieData, setPieData] = useState({
  //   labels: [],
  //   datasets: [{ label: 'Total', data: [] }],
  //   backgroundColor: [
  //     'rgba(43, 63, 229, 0.8)',
  //     'rgba(250, 192, 19, 0.8)',
  //     'rgba(253, 135, 135, 0.8)',
  //     'rgba(255, 159, 64, 0.2)',
  //   ],
  //   hoverOffset: 4,
  // });
  const [dataResult, setDataResult] = useState({
    labels: [],
    datasets: [{}],
    backgroundColor: [
      'rgba(43, 63, 229, 0.8)',
      'rgba(250, 192, 19, 0.8)',
      'rgba(253, 135, 135, 0.8)',
      'rgba(255, 159, 64, 0.2)',
    ],
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
    setGraphType('line');
  };

  const toggleBar = async () => {
    setGraphType('bar');
  };

  const togglePie = async () => {
    // console.log('dataResult: ', dataResult.datasets);
    let newsOutlets = [];
    let totalArticles = [];
    let testingPie = [
      { label: ['apnews.com'], data: [12, 5, 20] },
      { label: ['cnn.com'], data: [6, 14, 11] },
    ];
    testingPie.map((newslist) => {
      newsOutlets.push(newslist.label[0]),
        totalArticles.push(
          newslist.data.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          )
        );
    });
    setDataResult({
      labels: newsOutlets,
      datasets: [{ label: 'Total', data: totalArticles }],
      backgroundColor: [
        'rgba(43, 63, 229, 0.8)',
        'rgba(250, 192, 19, 0.8)',
        'rgba(253, 135, 135, 0.8)',
        'rgba(255, 159, 64, 0.2)',
      ],
      hoverOffset: 4,
    });
    // setPieData({
    //   labels: newsOutlets,
    //   datasets: [{ label: 'Total', data: totalArticles }],
    //   backgroundColor: [
    //     'rgba(43, 63, 229, 0.8)',
    //     'rgba(250, 192, 19, 0.8)',
    //     'rgba(253, 135, 135, 0.8)',
    //     'rgba(255, 159, 64, 0.2)',
    //   ],
    //   hoverOffset: 4,
    // });

    setGraphType('pie');
  };

  const fetchData = async (input, newsdomain, date) => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${input}&domains=${newsdomain}&from=${date}&to=${date}&apiKey=af7a60b8e1274d7a903e6ccc7096c441`
    );
    const result = await response.json();
    return result;
  };

  const showData = async () => {
    setDataResult({
      labels: [],
      datasets: [],
      backgroundColor: [],
      borderRadius: 5,
    });
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
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const year = date.getFullYear();

          const paddedMonth = month.toString().padStart(2, '0');
          const paddedDay = day.toString().padStart(2, '0');
          const paddedYear = year.toString();
          const fullDate = paddedYear + '-' + paddedMonth + '-' + paddedDay;
          setDataResult((dataresult) => ({
            ...dataresult,
            labels: [...dataresult.labels, fullDate],
          }));
        }
        // ITERATING THROUGH NEWS OUTLET
        // N = NUMBER OF NEWS OUTLETS
        outerLoop: for (let n = 0; n < news.length; n++) {
          let datalist = [];
          // ITERATING THROUGH DATES
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
            const res = await fetchData(userInput, news[n], fullDate);
            if (res.status === 'error') {
              if (res.code === 'rateLimited' || res.code === '429') {
                clearData();
                toggleRequestlimitModal();
                break outerLoop;
              }
            } else {
              datalist.push(res.totalResults);
            }
          }
          setDataResult((dataresult) => ({
            ...dataresult,
            datasets: [
              ...dataresult.datasets,
              { label: [news[n]], data: datalist },
            ],
          }));
        }
      }
    } catch (error) {
      console.error('News fetch error:', error);
    }
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
    // setPieData({
    //   labels: [],
    //   datasets: [{}],
    //   backgroundColor: [
    //     'rgba(43, 63, 229, 0.8)',
    //     'rgba(250, 192, 19, 0.8)',
    //     'rgba(253, 135, 135, 0.8)',
    //     'rgba(255, 159, 64, 0.2)',
    //   ],
    //   hoverOffset: 4,
    // });
    setDataResult({
      labels: [],
      datasets: [{}],
      backgroundColor: [
        'rgba(43, 63, 229, 0.8)',
        'rgba(250, 192, 19, 0.8)',
        'rgba(253, 135, 135, 0.8)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderRadius: 5,
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
      <div className="graph">
        <Chart className="chart" type={graphType} data={dataResult} />
        <div className="newslist">
          <DaysRange dayRange={dayRange} setDayRange={setDayRange}></DaysRange>
          <div className="checkboxnewsContainer">
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
        </div>
      </div>
      <div>
        <button onClick={toggleLine}>Line</button>
        <button onClick={toggleBar}>Bar</button>
        <button onClick={togglePie}>Pie</button>
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
