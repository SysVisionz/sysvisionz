import React, { Component } from 'react';
import DropMenu from './components/DropMenu';
import data from './data.json';
import logo from './images/minilogo.png';
import bgWires from './images/bgWires.png';
import './App.css';
import './components/common';
import menuImage from './images/menuImage.jpg';
import MainApp from './components/MainApp';

let headerColors = [
  [1, 6, 16, .5],
  [10, 44, 116, 1],
  [15,61,160,1],
  [10, 44, 116, 1],
  [1, 6, 16, .5],
  [0, 2, 5, 0]
]

for (let i in headerColors){
  headerColors[i] = 'rgba('+ headerColors[i].join(', ') + ')';
}

headerColors = headerColors.join(', ')

const styles = {
  appStyle: {
    top: {
      minHeight: window.innerHeight, 
      display: 'flex', 
      flexDirection:'column', 
    },
    side: {
      display: 'flex', 
      flexDirection: 'row', 
      minHeight: window.innerHeight, 
    }
  },
  mainStyle: {
    all: {
      margin: 25, 
      padding: 20, 
      background: 'rgba(180, 180, 180, .7)', 
      borderRadius: '10px',
    },
    top: {
      marginLeft: 75, 
      marginRight: 75, 
      marginTop: 75
    },
    side: { 
      marginTop:50, 
      marginLeft: 150
    }
  },
  logoStyle: {
    left: '10px', 
    alignSelf: 'flex-start', 
    width: '100px'
  },
  header: {
    top: {
      position:'inline',
      background: 'linear-gradient(' + headerColors + ')', 
      flexDirection:'row', 
      height:50,
    },
    side: {
      flexDirection: 'column',
      width:125, 
      background: 'linear-gradient( to right, '+headerColors+')' 
    }
  },
  menusDiv: {
    top : {
      paddingLeft: '100px', 
      flexDirection:'row', 
      display: 'flex',
      justifyContent: 'flex-start'
    },
    side: {
      paddingTop: '100px', 
      flexDirection: 'column', 
      flex:5
    }
  }
}

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

  render() {
    const {renderMenus} = this;
    const {topBar, loaded}=this.state;
    return (
      <div className="App" style={loaded ? topBar ? {...styles.appStyle.top, backgroundSize: 'auto ' + this.state.windowHeight + 'px'}  : {...styles.appStyle.side, backgroundSize: 'auto ' + this.state.windowHeight + 'px'} : {opacity: 0} }>
        <div style={{position:'fixed'}}>
          <div className="App-header" style={topBar ? {...styles.header.top, width:this.state.windowWidth} : {...styles.header.side, height: this.state.windowHeight} }>
            <div style={styles.logoStyle}><img src={logo} onLoad={() => this.setState({loaded: true})} className="App-logo" alt="logo" /></div>
            <div style={topBar ? styles.menusDiv.top : styles.menusDiv.side }>{renderMenus()}</div>
          </div>
        </div>
        <div id='mainSection' className={this.state.isOpen.indexOf(true) != -1 ? 'dim' : void 0}>
          <MainApp style={topBar ? {...styles.mainStyle.all, ...styles.mainStyle.top} : {...styles.mainStyle.all, ...styles.mainStyle.side}} />
        </div>
      </div>
    );
  }
}

export default App;
