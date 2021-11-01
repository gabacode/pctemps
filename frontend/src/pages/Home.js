import {useState, useEffect} from 'react'
import styled from 'styled-components'
import ReactSpeedometer from "react-d3-speedometer"

import Open from '../assets/menu.svg';
import Close from '../assets/cross.svg';
import Reload from '../assets/reload.svg';

export default function Home() {

  const [loading, setLoading] = useState(true)
  const [toggle, setToggle] = useState(false)
  const [data, setData] = useState();
  const [status, setStatus] = useState(null);

  const [host, setHost] = useState({
    url: "http://localhost",
    port: 6969
  })

  const [form, sendForm] = useState({
    url: host.url,
    port: host.port
  })

  var target = host.url+":"+host.port

  const handleErrors = (res) => {
    if (!res.ok) {
        throw Error(res.status);
    }
    setStatus(res.status)
    return res.json();
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetch(target)
      .then(handleErrors)
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((e) => {
        setStatus(e)
      });
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  },[data, target]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHost({
      url: form.url,
      port: form.port
    })
    setToggle(false)
}

  return (
    !loading?
    <>
      <Header>
          <Icon onClick={() => setToggle(!toggle)} src={toggle? Close : Open}/>
          <Icon onClick={() => window.location.reload(false)} src={Reload}/>
      </Header>
      {
        toggle?
          <Modal>
            <form style={{marginTop: '25px'}} onSubmit={handleSubmit}>
              <code>Set host and port number</code>
              <div style={{marginTop:'15px',textAlign:'center'}}>
                <input type='url' style={{width:'60%'}} value={form.url}  onChange={(e) => sendForm({...form, url: e.target.value})} />
                <input type='number' style={{width:'20%'}} value={form.port} onChange={(e) => sendForm({...form, port: e.target.value})} />
              </div>
              <Button type='submit' value='Submit'>OK</Button>
            </form>
          </Modal>
        : null
      }
      <div className='center'>
        <div className='row'>
          {
            data.filter(x => (x.Name).includes('GPU Core') || (x.Name).includes('CPU Package')).map((single, i) => (
              <div className='col-12 col-md-6' key={i}>
                <ReactSpeedometer
                  maxValue={100}
                  value={single.Value}
                  segments={5}
                  startColor='green'
                  endColor='red'
                  needleColor='#eee'
                />
                <code>
                  {single.Name}: 
                  {single.Value > 80 ? 
                    <span style={{color:'red'}}>
                      {parseFloat(single.Value).toFixed(0)}°C
                    </span> 
                  : 
                    <span>
                      {parseFloat(single.Value).toFixed(0)}°C
                    </span>
                  }
                </code>
              </div>
            ))
          }
        </div>
        <small style={{position:'absolute',bottom:'10px'}}>
          {status === 200 ? `Connected to: ${target}` : status.toString()}
        </small>
      </div>
    </>
    :
      <div className='center'>
        <code>
          Loading...
        </code>
      </div>
  );
}

const Header = styled.div`
  margin: 15px;
  position: fixed;
  display: flex;
  top: 0;
  background-color: transparent;
  height: 50px;
  width: 100%;
`;

const Icon = styled.img`
  cursor: pointer;
  height: 33px;
  display: flex;
  align-self: center;
  color: white;
`

const Modal = styled.div`
  background-color: black;
  border: 1px solid white;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  position: absolute;
  height: 200px;
  width: 400px;
  display: flex;
`
const Button = styled.button`
  color: white;
  background-color:transparent;
  display: flex;
  width: 50%;
  margin: 0 auto;
  justify-content:center;
  margin-top: 25px;
`