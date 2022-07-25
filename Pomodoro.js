import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackground} from 'react-native';
import { vibrate } from './utils';

function WorkTimer(props) {
  return (
      <View>
      <Text style={styles.title}>AUTODO</Text>
        <Text style={styles.title}>{props.work ? 'WORK' : 'BREAK'} TIME</Text>

        <View style={styles.t}>
          <View style={styles.disp}>
            <Text style={styles.timer}>{props.wm} : </Text>
            <Text style={styles.timer}>{props.ws}</Text>
          </View>
        </View>
      </View>
  );
}

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m: 0,
      s: 0,
      wm: 0,
      ws: 0,
      rm: 0,
      rs: 0,
      started: false,
      work: true,
    };

    this.handleWMChange = this.handleWMChange.bind(this);
    this.handleWSChange = this.handleWSChange.bind(this);
  }

  onStart = () => {
    console.log('started');
    this.setState((state) => ({ started: !state.started }));

    !this.state.started
      ? (this.interval = setInterval(this.dec, 1000))
      : clearInterval(this.interval);
  };

  dec = () => {
    console.log('dec');
    if (this.state.m <= 0 && this.state.s <= 0) {
      this.setState((state) => ({ work: !state.work }));
      vibrate();
      if (this.state.work) {
        this.setState((state) => ({
          m: this.state.wm,
          s: this.state.ws,
          started: true,
        }));
      } else {
        this.setState((state) => ({
          m: this.state.rm,
          s: this.state.rs,
          started: true,
        }));
      }
    }

    this.state.s <= 0
      ? this.setState((state) => ({ m: state.m - 1, s: 59 }))
      : this.setState((state) => ({ s: state.s - 1 }));
  };

  onReset = () => {
    if (this.state.work) {
      this.setState((state) => ({
        m: this.state.wm,
        s: this.state.ws,
        started: false,
      }));
      clearInterval(this.interval);
    } else {
      this.setState((state) => ({
        m: this.state.rm,
        s: this.state.rs,
        started: false,
      }));
      clearInterval(this.interval);
    }
  };

  handleWMChange = (wm) => {
    if (this.state.work) {
      this.setState({ wm: wm, m: wm });
    }
  };
  handleWSChange = (ws) => {
    if (this.state.work) {
      this.setState({ ws: ws, s: ws });
    }
  };
  handleRMChange = (rm) => {
    this.setState({ rm });
  };
  handleRSChange = (rs) => {
    this.setState({ rs });
  };

  render() {
    const wm = this.state.wm;
    const ws = this.state.ws;
    return (
      <View style={styles.container}>
        <View>
          <WorkTimer
            wm={this.state.m}
            ws={this.state.s}
            work={this.state.work}
          />
        </View>

        <View style={styles.disp}>
          <View style={styles.container}>
            <Text style={styles.txtBold}>Work</Text>
            <Text style={styles.disp}>Minutes: </Text>
            <TextInput
              style={styles.input}
              onChangeText={this.handleWMChange}
              value={wm}
              editable={this.state.started ? false : true}
              keyboardType="numeric"
            />
            <Text style={styles.disp}>Seconds: </Text>
            <TextInput
              style={styles.input}
              onChangeText={this.handleWSChange}
              editable={this.state.started ? false : true}
              value={ws}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.txtBold}>Rest</Text>
            <Text style={styles.disp}>Minutes: </Text>
            <TextInput
              style={styles.input}
              onChangeText={this.handleRMChange}
              editable={this.state.started ? false : true}
              value={this.state.rm}
              keyboardType="numeric"
            />
            <Text style={styles.disp}>Seconds: </Text>
            <TextInput
              style={styles.input}
              onChangeText={this.handleRSChange}
              editable={this.state.started ? false : true}
              value={this.state.rs}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View>
          <View style={styles.disp}>
            <Button
              title={this.state.started ? 'pause' : 'start'}
              color = "green"
              onPress={this.onStart}
            />
            <Button title="reset" color="#ff0000" onPress={this.onReset} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4169e1',
    alignItems: 'center',
    justifyContent: 'center',
    color: "white",
  },
  t: {
    alignItems: 'center',
    justifyContent: 'center',
    color: "white",
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: "white",
    marginBottom:30,
  },
  txtBold: {
    fontWeight: 'bold',
    color: "white",
    fontSize: 20,
  },
  timer: {
    fontSize: 48,
    color: "white",
  },
  disp: {
    flexDirection: 'row',
    paddingBottom: 2,
    color: "white",
  },
  input: {
    borderColor: 'black',
    color: "white",
    borderWidth: 1,
    padding: 5,
    borderRadius: 7,
    marginBottom: 10,
    width: '35%',
  },
});

export default Pomodoro