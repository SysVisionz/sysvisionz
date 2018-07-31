import React, { Component } from 'react';
import {Link, BrowserRouter} from 'react-router-dom';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import AuthBox from './components/AuthBox';
import logo from './images/minilogo.png';
import {BottomBar, BackgroundImage} from './components';
import Chat from './components/Chat'
import './App.css';
import './components/common';
import {MainApp} from './components/MainApp';
import bgWires from './images/bgWires.png';
import popButton from './images/popButton.png';
import config from './.config.json';
import {updateValue, userSignedIn, signUserOut} from './actions';

const cascadeCheck = (target, element) => {
  while (target.parentElement){
    if(target===element)
      return true;
    target = target.parentElement;
  }
  return false;
}

const mapStateToProps = (state) => {
  const {
    loading,
    _id,
    userChecked,
    persist,
    personal
  } = state.auth;
  return {
    loading,
    _id,
    persist,
    personal,
    userChecked
  };
}

export default connect ( mapStateToProps, {updateValue, userSignedIn, signUserOut} )(class App extends Component {
  constructor() {
    super();
    this.samePage = true;
    window.addEventListener("scroll", () => {
      if (this.samePage) {
        const newLocation = window.pageYOffset/5;
        this.setState({fromTop: -newLocation});
      }
    });
    window.onresize = () => {
      if (this.state.dropOpen) {
        this.setState({dropOpen: false});
        document.removeEventListener('click', this.closeMenu);
      }
    };
    let imageLoaded = {};
    const imagesIn = {build: 3, tutor: 6, home : 5, contact: 2}
    const pages = ['build', 'tutor', 'home', 'contact'];
    for (const i of pages) {
      for (let inside = imagesIn[i]; inside > 0; inside--){
        if (imageLoaded[i]) {
          imageLoaded[i].push(false)
        } 
        else {
          imageLoaded[i] = [false]
        }
      }
    }
    this.state = {
      tutorRecommendation: {code:false, shortcuts: false, docs: false, games: false},
      clicked: {code:false, shortcuts: false, docs: false, games: false},
      dropOpen: false,
      top: 0,
      show: true,
      loaded: {build: false, tutor: false, home: false, contact: false},
      imageLoaded,
      chatOpen: false
    }
  }

  authState = isOpen => this.setState({authOpen: isOpen});

  componentWillMount() {
    const token = localStorage.getItem('sysv-user-token')
    this.socket = io.connect('localhost:8080', {reconnect: true});
    this.props.userSignedIn(token, this.socket);
  }

  returnToTop = (isSame) => {
    let offset = window.pageYOffset;
    if (isSame) {
      this.scrollUp = setInterval(() => {
        if (offset > 5) { 
          window.scrollBy(0, -(offset*.20));
          offset -= offset*.15;
        }
        else {clearInterval(this.scrollUp)}
      }, 5);
    }
    else {
      this.samePage = false;
      let scrolledUp = false;
      let bgScrolledUp = false;
      this.scrollUp = setInterval(() => {
        if (offset > 5) { 
          window.scrollBy(0, -(offset*.20));
          offset -= offset*.15;
        }
        else {scrolledUp = true}
        if (this.state.fromTop < -5){ this.setState({fromTop: this.state.fromTop*.85}) }
        else { bgScrolledUp = true }
        if (bgScrolledUp && scrolledUp)
        {
          clearInterval(this.scrollUp);
          this.samePage = true;
        }
      }, 5);
    }
  }

  toggleFunct = (index, isOpen) => {
    isOpen[index] = !isOpen[index];
    this.setState({isOpen});
  }

  closeXSmall = () => {
    if (this.state.dropOpen) {
      this.setState({dropOpen: false});
      document.removeEventListener('click', this.closeMenu);
    }
  }

  closeChat = () => {
    this.setState({chatOpen: false})
  }

  linkClick = () => {
    this.setState({dropOpen: false})
    this.returnToTop()
    this.closeXSmall();
  }

  renderMenus = () => {
    const linkList = [{http: '/build', title: 'Build a Page'}, {http: '/tutor', title: 'Get Tutored'}, {http: '/blog', title: 'Blog'}];
    const link = linkList.map( (link, index) => <div key={'mainLink'+ index} className={'button-container'}><Link className = 'button main' onClick={this.linkClick} to={link.http}>{link.title.toUpperCase()}</Link></div>);
    return link;
  }

  openMenu = () => {
    this.setState({dropOpen: true});
    document.addEventListener('click', this.closeMenu);
  }

  closeMenu = evt => {
    const menuElement = document.getElementById('header-container');
    if (!cascadeCheck(evt.target, menuElement)) {
      this.setState({dropOpen: false});
      document.removeEventListener('click', this.closeMenu);
    }
  }

  chatOpen = () => {
    this.setStat({chatOpen: true})
  }

  isClicked = (select, is) => {
    this.setState({...this.state.clicked, [select]: is});
  }

  isUp = (select, up) => {
    this.setState({tutorRecommendation: {...this.state.tutorRecommendation, [select]: up}})
  }

  render() {
    const {renderMenus, props, state, returnToTop, openMenu, authState, isUp, isClicked} = this;
    const {bgLoaded, show, dropOpen, authOpen, tutorRecommendation,clicked}=state;
    const {_id, userChecked, personal} = props;
    const mainClassName = bgLoaded && userChecked ? 'app' : 'app inactive';
    return (
      <BrowserRouter>
        <div id="app-wrapper" className={mainClassName}>
          <div className={'bgDiv'}>
            <BackgroundImage fromTop={this.state.fromTop} bgWires={bgWires} bgLoaded={() => this.setState({bgLoaded: true})} />
            <div id="header-container" className={dropOpen ? "open" : ''}>
              <Link to='/'>
                <img src={logo} onClick = {this.linkClick} id="App-logo" alt="logo" />
              </Link>
              <div id="nav-bar">
                {renderMenus()}
              </div>
            </div>
            <AuthBox 
              socket = {this.socket}
              cascadeCheck={cascadeCheck}
              returnToTop={returnToTop}
              authState={authState}
            />
            <div id="open-menu-div"><img onClick={() => openMenu()} className={dropOpen ? 'open' : ''} alt = 'error' id="open-menu-button" src={popButton} /></div>
            <MainApp
              socket = {this.socket}
              tutorRecommendation = {tutorRecommendation}
              id="main-wrapper"
              isUp={isUp}
              clicked={clicked}
              _id={_id}
              mountFunct={() => this.setState({show:true})} 
              unmountFunct={() => this.setState({show:false})} 
              in={show}
              dim={dropOpen || authOpen }
              returnToTop={returnToTop}
              name={personal && personal.name ? personal.name : 'Stranger'}
              isClicked={isClicked}
              authState={authState}
            />
          </div>
          <BottomBar returnToTop={returnToTop} />
          <Chat user = {this.props._id} open = {this.state.chatOpen} onClick = {this.chatClick} />
        </div>
      </BrowserRouter>
    );
  }
});