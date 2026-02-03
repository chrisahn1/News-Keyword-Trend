import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {
  const [newData, setNewsData] = useState([]);

  const getNewsData = async () => {
    const res = await axios.get(
      'https://newsapi.org/v2/everything?q=bitcoin&apiKey=af7a60b8e1274d7a903e6ccc7096c441'
    );
    setNewsData(res.data.articles);
  };

  useEffect(() => {
    getNewsData();
  }, []);

  const showResults = async () => {
    getNewsData();
  };

  console.log('size: ', newData.length);

  return (
    <div className="App">
      <button onClick={showResults}>Click Here</button>
    </div>
  );
}

export default Home;
