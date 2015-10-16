var React = require('react-native');
var Api = require('../Utils/Api');
var Dashboard = require('./Dashboard');

//  NOTES:
//  check for the spinner, not centered
//

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      isLoading: false,
      error: false
    }
  }
  handleChange(event) {
    this.setState({
      city: event.nativeEvent.text
    });
  }
  handleSubmit() {
    // update our indicatorIOS spinner
    this.setState({
      isLoading: true
    });
    Api.getLocation(this.state.city)
      .then((res) => {
        // console.log(res.message); to check request
        if (res.message === "Error: Not found city") {
          this.setState({
            error: 'City not found',
            isLoading: false
          })
        } else {
          this.props.navigator.push({
            title: res.name || "Select an option",
            component: Dashboard,
            passProps: {cityInfo: res}
          });
          this.setState({
            isLoading: false,
            error: false,
            city: ''
          })
        }
      });
  }
  render() {
    var showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    );
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Enter your city</Text>
        <TextInput 
          style={styles.searchInput} 
          value={this.state.city} 
          onChange={this.handleChange.bind(this)} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white"> 
          <Text style={styles.buttonText}>Search </Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#111"
          size="large">
        </ActivityIndicatorIOS>
        {showErr}
      </View>
    )
  }
};

module.exports = Main;