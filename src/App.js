import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DropMenu from './components/DropMenu';
import data from './data.json';
import logo from './images/minilogo.png';
import './App.css';
import './components/common';
import menuImage from './images/menuImage.jpg';
import MainApp from './components/MainApp';


class App extends Component {
  constructor() {
    super();
    let dataMap = [];
    let topBar = window.innerWidth > 940 ? true : false;
    window.onresize = () => {
      window.innerWidth < 940 && this.state.topBar ? this.setState({topBar: false}) : void 0;
      window.innerWidth > 940 && !this.state.topBar ? this.setState({topBar: true}) : void 0;
      this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
    };
    this.state = {
      dataMap,
      topBar,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      isOpen: []
    }
  }

  componentDidMount(){
    this.setState({imageCount: document.getElementsByTagName('img').length});
  }

  renderMenus = () => {
    let {dataMap} = this.state
    dataMap = data.map((i, index) => {
          return (
            <DropMenu
              key={"sysvDropdown" + index}
              label={i.label}
              entries={i.entries}
              menuImage={menuImage}
              topBar={this.state.topBar}
              onToggle={isThisOpen => {
                let isOpen = [...this.state.isOpen];
                isOpen[index]=isThisOpen;
                this.setState({isOpen})
              }}
            />
          );
        });
    return dataMap;
  }

  topSide = (initial) => [initial, this.state.topBar ? 'top' : 'side'].join(' ');

  render() {
    const {renderMenus, topSide} = this;
    const {topBar, loaded}=this.state;
    return (
      <div className={["App", topBar ? 'top': 'side', !loaded ? 'inactive' : void 0].join(' ')} style={{height:this.state.windowHeight}}>
        <div className="headerContainer">
          <div className={topSide("App-header")} style={topBar ? {width:this.state.windowWidth} : {height: this.state.windowHeight} }>
            <img src={logo} onLoad={() => this.setState({loaded: true})} className="App-logo" alt="logo" />
            <div className = {topSide('menusDiv')}>
              {renderMenus()}
              <div><Link className = {topSide('dropButton main')} to='/contact'>CONTACT</Link></div>
            </div>
          </div>
        </div>
        <div id='mainSection' className={this.state.isOpen.indexOf(true) != -1 ? 'dim' : void 0}>
          <MainApp className = {topSide('mainSection')} />
        </div>
      </div>
    );
  }
}

export default App;
