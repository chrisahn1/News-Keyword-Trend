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
  const [newsCheckboxList, setNewsCheckboxList] = useState(new Set());
  const [dayRange, setDayRange] = useState('1');
  const [graphType, setGraphType] = useState('line');
  const colors = [
    'rgba(43, 63, 229, 0.8)',
    'rgba(250, 192, 19, 0.8)',
    'rgba(253, 135, 135, 0.8)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(201, 203, 207, 0.2)',
  ];
  const [dataResult, setDataResult] = useState({
    labels: [],
    datasets: [{}],
    backgroundColor: [],
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

  const fetchData = async (input, newsdomain, date) => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${input}&domains=${newsdomain}&from=${date}&to=${date}&apiKey=af7a60b8e1274d7a903e6ccc7096c441`
    );
    const result = await response.json(); //result.totalResults
    console.log(
      `https://newsapi.org/v2/everything?q=${input}&domains=${newsdomain}&from=${date}&to=${date}&apiKey=af7a60b8e1274d7a903e6ccc7096c441`
    );
    console.log(`${input} ${newsdomain} ${date} result.totalResults: `, result);
    return result.totalResults;
  };

  const showData = async () => {
    setDataResult({
      labels: [],
      datasets: [],
      backgroundColor: [],
      borderRadius: 5,
    });
    //APPEND OBJECT NEWS CHECK BOX KEYS INTO LIST SINCE AWAIT FETCH WILL NOT WORK INSIDE OBJECT MAP
    let news = [];
    Object.keys(newsCheckboxList).map((key) => {
      if (newsCheckboxList[key] === true) {
        news.push(key);
      }
    });
    try {
      //ENSURE REQUEST LIMIT ERROR, USER TEXT INPUT ERROR(EMPTY OR INVALID), CHECKBOX EMPTY ERROR
      if (userInput.length > 15 || userInput.length < 1) {
        toggleCharlimitModal();
      } else if (/[^A-Za-z]/.test(userInput) === true) {
        toggleCharlimitModal();
      } else if (
        Object.keys(newsCheckboxList).length === 0 ||
        Object.values(newsCheckboxList).every((value) => !value) === true
      ) {
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
        // N = NUMBER OF NEWS OUTLETS
        for (let n = 0; n < news.length; n++) {
          setDataResult((dataresult) => ({
            ...dataresult,
            backgroundColor: [...dataresult.backgroundColor, colors[n]],
          }));
          let datalist = [];
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
            datalist.push(res);
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

    //FOR LOOP ITERATE THROUGH LABELS(DAYS), LABEL(NEWS OUTLET), AND DATA(TOTALRESULTS)

    // const res = await fetch(
    //   'https://newsapi.org/v2/everything?q=trump&domains=techcrunch.com&from=2026-02-02&to=2026-02-02&apiKey=af7a60b8e1274d7a903e6ccc7096c441'
    // );
    // const result = await res.json(); //result.totalResults
  };

  console.log(dataResult);

  const clearData = async (e) => {
    e.preventDefault();
    //CLEAR USER TEXT INPUT, CHECKBOXES, RESET DAY RANGE TO 1, RESET GRAPH TYPE TO LINE
    setUserInput('');
    setNewsCheckboxList(new Set());
    setDayRange('1');
    setGraphType('line');
    setDataResult({
      labels: [],
      datasets: [{}],
      backgroundColor: [],
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
        <Chart className="chart" type={graphType} data={dataResult} />
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
