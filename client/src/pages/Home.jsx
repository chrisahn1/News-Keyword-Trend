import axios from 'axios';
import { useState } from 'react';

function Home() {
  const [newsData, setNewsData] = useState(0);

  const getNewsData = async () => {
    const res = await axios.get(
      'https://newsapi.org/v2/everything?q=trump&from=2026-02-02&to=2026-02-02&apiKey=af7a60b8e1274d7a903e6ccc7096c441'
    );
    setNewsData(res.data.totalResults);
  };

  // useEffect(() => {
  //   getNewsData();
  // }, []);

  const showResults = async () => {
    getNewsData();
  };

  const clearResults = async () => {
    setNewsData(0);
  };

  return (
    <div className="App">
      {newsData}
      <button onClick={showResults}>Click Here</button>
      <button onClick={clearResults}>Clear</button>
    </div>
  );
}

export default Home;
