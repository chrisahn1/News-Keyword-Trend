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
  // const newsList = [
  //   { news: 'cnn', checked: false },
  //   { news: 'associated-press', checked: false },
  //   { news: 'the-washington-post', checked: false },
  //   { news: 'cbs-news', checked: false },
  //   { news: 'abc-news', checked: false },
  //   { news: 'bbc-news', checked: false },
  //   { news: 'business-insider', checked: false },
  //   { news: 'fox-news', checked: false },
  //   { news: 'msnbc', checked: false },
  //   { news: 'nbc-news', checked: false },
  //   { news: 'politico', checked: false },
  //   { news: 'newsweek', checked: false },
  //   { news: 'the-hill', checked: false },
  //   { news: 'the-huffington-post', checked: false },
  // ];
  const [newsListInput, setNewsListInput] = useState({});
  const [newsList, setNewsList] = useState([]);
  const [graphType, setGraphType] = useState('line');
  const [data, setData] = useState({
    labels: [],
    datasets: [{ label: [], data: [], type: graphType }],
    borderRadius: 5,
  });

  // const data = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       data: [10, 20, 30, 40],
  //       borderColor: 'rgb(255, 99, 132)',
  //       borderWidth: 2,
  //       type: chartType,
  //     },
  //     {
  //       label: 'Dataset 2',
  //       data: [15, 25, 35, 45],
  //       backgroundColor: 'rgb(75, 192, 192)',
  //       type: chartType,
  //     },
  //   ],
  // };

  const toggleLine = async () => {
    setGraphType('line');
  };

  const toggleBar = async () => {
    setGraphType('bar');
  };

  const showData = async () => {
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
    setNewsListInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmitNews = (event) => {
    //check if news value is false and if it exists in list, if so then remove it from list
    {
      Object.keys(newsListInput).map((key) => {
        if (newsListInput[key] === true) {
          console.log('key: ', key);
          setNewsList((list) => [...list, key + '.com']);
        }
      });
    }
    console.log(newsList);
    event.preventDefault();
  };

  // const showNewsData = async () => {
  //   const res = await axios.get(
  //     'https://newsapi.org/v2/everything?q=trump&domains=techcrunch.com,thenextweb.com&from=2026-02-02&to=2026-02-02&apiKey=af7a60b8e1274d7a903e6ccc7096c441'
  //   );
  //   setNewsData(res.data.totalResults);
  //   console.log(res.data.totalResults);
  // };

  return (
    <div className="graphs">
      <div className="graph">
        <Chart className="chart" type={graphType} data={data} />
        <div className="newslist">
          <form onSubmit={handleSubmitNews}>
            <label>
              CNN:
              <input
                type="checkbox"
                name="cnn"
                checked={newsListInput.cnn}
                onChange={handleChange}
              />
            </label>
            <label>
              Associated Press:
              <input
                type="checkbox"
                name="associatedpress"
                checked={newsListInput.associatedpress}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Confirm</button>
          </form>
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
    </div>
  );
}

export default Home;
