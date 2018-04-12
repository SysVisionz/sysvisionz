import React, { Component } from 'react';
import {Link, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {BottomBar} from './components/';
import AuthModal from './components/AuthModal';
import AuthBox from './components/AuthBox';
import data from './data.json';
import logo from './images/minilogo.png';
import './App.css';
import './components/common';
import {MainApp} from './components/MainApp';
import bgWires from './images/bgWires.png';
import popButton from './images/popButton.png';
import config from './.config.json';
import {updateValue, closeModal, userSignedIn} from './actions';

const cascadeCheck = (element, check) => {
  while (element.parentElement){
    if(element.parentElement.className && element.parentElement.className.indexOf(check) !== -1)
      return true;
    element = element.parentElement;
  }
  return false;
}

const mapStateToProps = (state) => {
  const {
    loading,
    user,
    newUser,
  } = state.auth;
  return {
    loading,
    user,
    newUser,
  };
}

export default connect ( mapStateToProps, {updateValue, closeModal, userSignedIn} )(class App extends Component {
  constructor() {
    super();
    let dataMap = [];
    let topBar = window.innerWidth > 940 ? true : false;
    let xSmall = window.innerWidth < 600 ? true : false;
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
        this.setState({fromTop: -newLocation});
      }
    });
    let isOpen = [];
    let isLoaded = [];
    for (let i = 0; i < data.length; i++) {
      isOpen[i]=false;
      isLoaded[i]=false;
    }
    isLoaded[data.length] = false;
    this.state = {
      dataMap,
      topBar,
      xSmall,
      xSmallOpen: false,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      isOpen,
      show: true,
      isLoaded,
      loaded: false
    }
  }

  componentDidMount() {
    this.props.userSignedIn();
  }

  componentWillMount() {
    firebase.initializeApp(config.auth);
  }

  returnToTop = () => {
    this.samePage = false;
    this.wait = setInterval(() => {
      if (this.state.fromTop < -5)
        this.setState({fromTop: this.state.fromTop*.85});
      else {
        clearInterval(this.wait);
        this.samePage = true;
      }
    }, 5);
  }

  loadNext = () => {
    if (this.state.isLoaded[this.loading] === false){
        let isLoaded = this.state.isLoaded;
        isLoaded[this.loading] = true;
        this.setState(isLoaded);
        this.loading++;
      }
    else {
      clearInterval(this.loadTimer);
    }
  }

  loadingFunct = () => {
    this.loading = 0;
    setTimeout(() => this.loadTimer = setInterval(() => this.loadNext(), 200), 200);
  }

  toggleFunct = (index, isOpen) => {
    isOpen[index] = !isOpen[index];
    this.setState({isOpen});
  }

  linkClick = () => {
    this.setState({xSmallOpen: false, dim: false})
    this.returnToTop()
  }

  renderMenus = () => {
    const linkList = [{http: '/build', title: 'Build a Page'}, {http: '/tutor', title: 'Get Tutored'}, {http: '/contact', title: 'Contact'}];
    const link = linkList.map( (link, index) => <div key={'mainLink'+ index}><Link className = {this.topSide('dropButton main')} onClick={this.linkClick} to={link.http}>{link.title.toUpperCase()}</Link></div>);
    return link;
  }

  topSide = (initial) => [initial, this.state.topBar ? 'top' : 'side'].join(' ');

  closeXSmall = evt => {
    if (!cascadeCheck(evt.target, 'headerContainer')) {
      this.setState({xSmallOpen: false, dim: false})
      document.removeEventListener('click', this.closeXSmall);
    }
  }

  openXSmall = () => {
    this.setState({xSmallllOpen: true, dim: true});
    document.addEventListener('click', this.closeXSmall);
  }

  dimmer = isDim => this.setState({dim: isDim});

  loaderCheck = isLoaded => this.setState({loaded: isLoaded, dim: false});

  render() {
    const {renderMenus, topSide} = this;
    const {topBar, loaded, bgLoaded,xSmall, xSmallOpen}=this.state;
    const user = this.props.user;
    const mainSectionClass =topSide('mainSection').concat(this.props.mainSectionClass ? ' ' + this.props.mainSectionClass : '');
    return (
      <BrowserRouter>
        <div className={["App", topBar ? 'top': 'side', !loaded ? 'inactive' : void 0].join(' ')} style={{height:this.state.windowHeight*.6}}>
          <div className={'bgDiv'.concat(!bgLoaded ? ' inactive' : '')}>
            <img alt='error' style={{top: this.state.fromTop}} id="bgImage" src={bgWires} onLoad={() => {
                this.loadingFunct();
                this.setState({bgLoaded: true});
              }
            } />
            <div className={['headerContainer', xSmall ? 'xSmall' : '', xSmallOpen ? 'open' : ''].join(' ')}>
              <div className={topSide("App-header")} style={topBar ? {width:this.state.windowWidth} : {height: this.state.windowHeight*.6} }>
                <Link to='/'>
                  <img src={logo} onLoad={() => this.setState({loaded: true})} className={topSide("App-logo")} alt="logo" />
                </Link>
                <div className = {topSide('menusDiv')}>
                  {renderMenus()}
                </div>
              </div>
            </div>
            <AuthBox 
              xSmall={xSmall}
              cascadeCheck={cascadeCheck}
              returnToTop={this.returnToTop}
            />
            <div hidden={!xSmall} className={["openButton", xSmallOpen ? 'open' : ''].join(' ')} onClick={() => this.openXSmall()}><img alt = 'error' id="popSideButton" src={popButton} /></div>
            <MainApp 
              dim = {this.state.dim}
              xSmall={xSmall} 
              topBar={topBar} 
              className = {mainSectionClass}
              user={user}
              mountFunct={() => this.setState({show:true})} 
              unmountFunct={() => this.setState({show:false})} 
              in={this.state.show}
              dimmer = {this.dimmer}
              loaded = {this.state.loaded}
              loaderCheck = {this.loaderCheck}
            />
          </div>
          <AuthModal 
            visible={this.props.newUser} 
            onClose={this.props.closeModal}
          />
          <BottomBar />
        </div>
      </BrowserRouter>
    );
  }
});