import {useState, useEffect} from 'react'
import ReactSpeedometer from "react-d3-speedometer"

export default function Home() {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState();
  const [status, setStatus] = useState(null);

  const url = 'http://localhost:6969';

  useEffect(() => {
    const fetchData = async () => {
      await fetch(url).then((res) => {
        setStatus(res.status)
        return res.json()
      })
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((e) => console.error(e));
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  },[data]);


  return (
    !loading?
      <div className="center">
        <code>[{status}]</code>
        <div className="row">
          {
            data.filter(x => (x.Name).includes('GPU') || (x.Name).includes('Package')).map(single => (
              <div className="col-12 col-md-6">
                <ReactSpeedometer
                  maxValue={100}
                  value={single.Value}
                  segments={5}
                  startColor="green"
                  endColor="red"
                  needleColor="#eee"
                />
                <code>
                  {single.Name}: {single.Value}°C
                </code>
              </div>
            ))
          }
          </div>
      </div>
    :
      <div className='center'>
        <code>
          Loading...
        </code>
      </div>
  );
}