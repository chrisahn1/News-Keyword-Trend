import axios from 'axios';
import { useState } from 'react';

function Home() {
  const [newsData, setNewsData] = useState(0);

  const getNewsData = async () => {
    const res = await axios.get(
      'https://newsapi.org/v2/everything?q=trump&apiKey=af7a60b8e1274d7a903e6ccc7096c441'
    );
    setNewsData(res.data.totalResults);
  };

  // useEffect(() => {
  //   getNewsData();
  // }, []);

  const showResults = async () => {
    getNewsData();
  };

  console.log('size: ', newsData);

  return (
    <div className="App">
      {newsData}
      <button onClick={showResults}>Click Here</button>
    </div>
  );
}

export default Home;
