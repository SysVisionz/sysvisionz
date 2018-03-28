import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import firebase from 'firebase';
import Dropdown from 'sysvisionz-react-dropdown';
import {DropMenu} from './components/';
import data from './data.json';
import logo from './images/minilogo.png';
import './App.css';
import './components/common';
import menuImage from './images/menuImage.jpg';
import {MainApp} from './components/MainApp';
import bgWires from './images/bgWires.png';
import popButton from './images/popButton.png';
import config from './.config.json';
import {updateValue, loginUser} from './actions';

const cascadeCheck = (element, check) => {
  while (element.parentElement){
    if(element.parentElement.className && element.parentElement.className.indexOf(check) !== -1)
      return true;
    element = element.parentElement;
  }
  return false;
}

class App extends Component {
  constructor() {
    super();
    let dataMap = [];
    let topBar = window.innerWidth > 940 ? true : false;
    let xSmall = window.innerWidth < 600 ? true : false;
    document.onclick = evt => !cascadeCheck(evt.target, 'headerContainer') && this.state.xSmallOpen ? this.setState({xSmallOpen: !this.state.xSmallOpen}) : undefined;
    window.onresize = () => {
      window.innerWidth < 940 && this.state.topBar ? this.setState({topBar: false}) : void 0;
      window.innerWidth > 940 && !this.state.topBar ? this.setState({topBar: true}) : void 0;
      window.innerWidth < 600 && !this.state.xSmall ? this.setState({xSmall: true}) : void 0;
      window.innerWidth > 600 && this.state.xSmall ? this.setState({xSmall: false}) : void 0;
      this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
    };
    this.samePage = true;
    window.addEventListener("scroll", () => {
      if (this.samePage) {
        const newLocation = window.pageYOffset/5;
        this.setState({fromTop: -newLocation})
      }
    });
    let isOpen = [];
    for (let i = 0; i < data.length; i++) {
      isOpen[i]=false;
    }
    this.state = {
      authOpen: false,
      dataMap,
      topBar,
      xSmall,
      xSmallOpen: false,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      isOpen,
      show: true,
      uid: {
        name: 'undefined'
      }
    }
  }

  returnToTop = () => {
    this.samePage = false;
    this.wait = setInterval(() => {
      if (this.state.fromTop < -5)
        this.setState({fromTop: this.state.fromTop*.85}) 
      else {
        clearInterval(this.wait);
        this.samePage = true;
      }
    }, 5);
  }

  toggleFunct = (index, isOpen) => {
    isOpen[index] = !isOpen[index];
    this.setState({isOpen});
  }

  renderMenus = () => {
    const dataMap = data.map((i, index) => {
      return (
        <DropMenu
          key={"sysvDropdown" + index}
          label={i.label}
          entries={i.entries}
          menuImage={menuImage}
          topBar={this.state.topBar}
          onToggle={() => this.toggleFunct(index, this.state.isOpen)}
          onLinkClick={() => this.returnToTop()}
          isOpen={this.state.isOpen[index]}
        />
      );
    });
    return dataMap;
  }

  topSide = (initial) => [initial, this.state.topBar ? 'top' : 'side'].join(' ');

  xSmallShut = () => this.state.xSmall && this.state.xSmallOpen ? this.setState({xSmallOpen: false}) : void 0;

  componentWillMount() {
    firebase.initializeApp(config.auth);
  }

  authBox = () => {
    if (this.state.uid.name) {
      return (
        <div className='auth'>
        {'Welcome, ' + this.state.uid.name + '!'}
        <Dropdown 
          label='User Options'
          entries={['Active Projects', 'New Project', 'Profile']}
        />
      </div>
      )
    }
    if (this.state.authOpen) {
      document.onclick = evt => {
        if (evt.target.className.indexOf('auth') == -1 || evt.target.parentElement.className.indexOf('auth') == -1) 
          this.setState({authOpen: false});
      }
      return (
        <form className = "auth open">
          <input type ='text' name='email' className="authInput" placeholder="email" />
          <input type ='text' name='email' className="authInput" placeholder="password" />
        </form>
      );
    }
    else {
      return (<div className="auth closed" onClick={() => this.setState({authOpen: true})}>+</div>);
    }
  }

  render() {
    const {renderMenus, topSide} = this;
    const {topBar, loaded, bgLoaded,xSmall, xSmallOpen}=this.state;
    let mainSectionClass = this.state.isOpen.indexOf(true) !== -1 || (xSmall && xSmallOpen) ? 'dim ' : '';
    mainSectionClass = mainSectionClass +' '+ topSide('mainSection');
    return (
      <div className={["App", topBar ? 'top': 'side', !loaded ? 'inactive' : void 0].join(' ')} style={{height:this.state.windowHeight}}>
        <div className={['bgDiv', !bgLoaded ? ' inactive' : ''].join(' ')}>
          <img alt='error' style={{top: this.state.fromTop}} id="bgImage" src={bgWires} onLoad={() => this.setState({bgLoaded: true})} />
          <div className={['headerContainer', xSmall ? 'xSmall' : '', xSmallOpen ? 'open' : ''].join(' ')}>
            {this.authBox()}
            <div className={topSide("App-header")} style={topBar ? {width:this.state.windowWidth} : {height: this.state.windowHeight} }>
              <Link to='/'>
                <img src={logo} onLoad={() => this.setState({loaded: true})} className={topSide("App-logo")} alt="logo" />
              </Link>
              <div className = {topSide('menusDiv')}>
                {renderMenus()}
                <div><Link className = {topSide('dropButton main')} onClick={() => this.returnToTop()} to='/contact'>CONTACT</Link></div>
              </div>
            </div>
          </div>
          <div hidden={!xSmall} className={["openButton", xSmallOpen ? 'open' : ''].join(' ')} onClick={() => this.setState({xSmallOpen: !xSmallOpen})}><img alt = 'error' id="popSideButton" src={popButton} /></div>
          <MainApp xSmall={xSmall} topBar={topBar} className = {mainSectionClass} mountFunct={() => this.setState({show:true})} unmountFunct={() => this.setState({show:false})} in={this.state.show} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    email,
    password,
    error,
    loading,
    user
  } = state.auth;
  return {
    email,
    password,
    error,
    loading,
    user
  };
}

export default connect (mapStateToProps, {updateValue, loginUser})(App);