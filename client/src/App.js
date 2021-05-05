
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import logo from './logo.svg'
import './App.css'
import store from './store'
import Dropdown from './components/Dropdown/Dropdown';
// import DropdownFunc from './components/Dropdown/DropdownFunc';

class App extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.tabKeyPressed);
    window.addEventListener('mousedown', this.mouseClicked);
  }

  tabKeyPressed = (e) => {
    if (e.keyCode === 9) {
      document.querySelector('body').classList.remove('noFocus');
      window.removeEventListener('keydown', this.tabKeyPressed);
      window.addEventListener('mousedown', this.mouseClicked);
    }
  }

  mouseClicked = () => {
    document.querySelector('body').classList.add('noFocus');
    window.removeEventListener('mousedown', this.mouseClicked);
    window.addEventListener('keydown', this.tabKeyPressed);
  }

  onChange = (item, name) => { console.log(item, name); }


  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">React</h1>
          </header>
          <Dropdown
            name="location"
            searchable={['Search', 'No matching']}
            title="Select"
            onChange={this.onChange}
          />
        </div>
      </Provider>
    )
  }
}

export default App
