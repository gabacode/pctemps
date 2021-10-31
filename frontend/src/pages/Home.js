import {useState, useEffect} from 'react'

export default function Home() {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState();

  const url = 'http://localhost:6969';

  useEffect(() => {
    const fetchData = async () => {
      await fetch(url)
        .then((res) => res.json())
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
      <pre>
        {JSON.stringify(data, null, 4)}
      </pre>
    :
      <pre>
        Loading...
      </pre>
  );
}