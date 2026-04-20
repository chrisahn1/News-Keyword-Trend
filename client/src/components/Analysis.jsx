import { useEffect, useState } from 'react';

function Analysis({ dataRange, data }) {
  console.log('data analysis: ', data.datasets);
  const [message, setMessage] = useState('Please enter input for analysis');

  useEffect(() => {
    const printAnalysis = async () => {
      if (data.datasets.length === 0) {
        setMessage('Please enter input for analysis');
      } else {
        let sumArticles = [];
        let newsList = [];

        for (let i = 0; i < data.datasets.length; i++) {
          let current = data.datasets[i].data.reduce(
            (total, number) => total + number,
            0
          );

          sumArticles.push(current);
          newsList.push(data.datasets[i].label[0]);
        }

        const minValue = Math.min(...sumArticles);
        const minIndex = sumArticles.indexOf(minValue);

        const maxValue = Math.max(...sumArticles);
        const maxIndex = sumArticles.indexOf(maxValue);

        const minNewsOutlet = newsList[minIndex];
        const maxNewsOutlet = newsList[maxIndex];

        setMessage(
          `${maxNewsOutlet} has the highest frequency of user input within the span of ${dataRange} days while ${minNewsOutlet} has the least frequency`
        );
      }
    };

    printAnalysis();
  }, [data]);

  return (
    <div className="analysis">
      <h4>{message}</h4>
    </div>
  );
}

export default Analysis;
