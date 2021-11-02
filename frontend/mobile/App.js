import React, {useState, useEffect} from 'react';
import { Modal, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Speedometer from 'react-native-cool-speedometer'

export default function App() {

  const [loading, setLoading] = useState(true)
  const [toggle, setToggle] = useState(true)
  const [data, setData] = useState();
  const [status, setStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState("Checking connection...")

  const [host, setHost] = useState({
    url: "http://localhost",
    port: 6969
  })

  const [form, sendForm] = useState({
    url: host.url,
    port: host.port
  })

  var target = host.url+":"+host.port

  useEffect(() => {
    const fetchData = async () => {
      await fetch(target)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Bad response from server");
        }
        setStatus(res.status)
        return res.json();
      })
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((e) => {
        //console.log(e)
        setLoading(true)
        setLoadingStatus(`Check connection to ${target} \n ${e}`)
        setStatus(e)
      });
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  },[data, target]);

  const handleSubmit = () => {
    setLoadingStatus("Trying to connect...")
    setHost({
      url: form.url,
      port: form.port
    })
    setToggle(false)
}

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor={'black'}/>
      <View style={styles.header}>
        <Ionicons style={{zIndex:9999}} onPress={() => setToggle(!toggle)} name={toggle? "md-close-sharp":"md-menu"} size={50} color="white" />
      </View>
      <Modal transparent={true} visible={toggle}>
        <View style={styles.container}>
          <View style={styles.popup}>
            <Text style={styles.monotext}>Set host and port number</Text>
            <Text style={styles.monotext}>{form.url}:{form.port}</Text>
            <TextInput style={styles.input}
              value={form.url}
              onChangeText={(text) => sendForm({...form, url: text})}
            />
            <TextInput style={styles.input}
              value={(form.port).toString()}
              keyboardType='numeric'
              onChangeText={(text) => sendForm({...form, port: text})}
            />
            <Pressable style={styles.btn} onPress={() => handleSubmit()}>
              <Text style={styles.buttontext}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {
        !loading?
          <View>
            {
              data.filter(x => (x.Name).includes('GPU Core') || (x.Name).includes('CPU Package')).map((single, i) => (
                <View style={{alignSelf:'center'}}key={i}>
                  <Text style={styles.monotext}>
                    {single.Name}
                  </Text>
                  <Speedometer
                    accentColor="green"
                    duration={500}
                    size={200}
                    value={single.Value}
                    max={100}
                    angle={160}
                    backgroundAngle={180}
                    indicatorStyle={{
                      bottom: 10,
                      fontSize: 40,
                      color: '#555'
                    }}
                    dangerZone
                    dangerZoneAngle={30}
                    fontFamily='monospace'
                    indicatorSuffix='°C'
                  />
                </View>
              ))
            }
            <View>
              <Text style={styles.monotext}>
                {status === 200 ? `Connected to: ${target}` : status.toString()}
              </Text>
            </View>
          </View>
      :
          <View>
              <View style={{textAlign:'center'}}>
                <Text style={styles.monotext}>{loadingStatus}</Text>
              </View>
          </View>
      }
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  monotext: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'monospace',
    marginBottom: 15
  },
  buttontext: {
    color: 'white',
    margin: 10
  },
  popup: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: "white",
    padding: 40,
    borderRadius: 5
  },
  btn: {
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#000'
  },
  input: {
    backgroundColor:'white',
    height: 42,
    marginBottom: 10,
    borderWidth: 2,
    borderColor:'#555',
    padding: 9
  },
  header: {
    margin: 15,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    top: 0,
    backgroundColor: 'transparent',
    height: 50,
    width: '100%'
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30
  }

});
