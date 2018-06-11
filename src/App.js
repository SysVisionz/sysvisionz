import React, { Component } from 'react';
import {Link, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import firebase from 'firebase';
import AuthModal from './components/AuthModal';
import AuthBox from './components/AuthBox';
import logo from './images/minilogo.png';
import {BottomBar} from './components/BottomBar';
import './App.css';
import './components/common';
import {MainApp} from './components/MainApp';
import bgWires from './images/bgWires.png';
import popButton from './images/popButton.png';
import config from './.config.json';
import {updateValue, closeModal, userSignedIn} from './actions';

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
    user,
    newUser,
  } = state.auth;
  const {
    personal,
  } = state.site;
  return {
    personal,
    loading,
    user,
    newUser,
  };
}

export default connect ( mapStateToProps, {updateValue, closeModal, userSignedIn} )(class App extends Component {
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
      imageLoaded
    }
  }

  componentDidMount() {
    this.props.userSignedIn();
  }

  authState = isOpen => this.setState({authOpen: isOpen});

  componentWillMount() {
    firebase.initializeApp(config.auth);
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

  isClicked = (select, is) => {
    this.setState({...this.state.clicked, [select]: is});
  }

  isUp = (select, up) => {
    this.setState({tutorRecommendation: {...this.state.tutorRecommendation, [select]: up}})
  }

  render() {
    const {renderMenus, props, state, returnToTop, openMenu, authState, isUp, isClicked} = this;
    const {bgLoaded, show, dropOpen, authOpen, tutorRecommendation,clicked}=state;
    const {user, personal, newUser, closeModal} = props;
    return (
      <BrowserRouter>
        <div id="app-wrapper" className={'app'.concat(!bgLoaded || !(personal.name || user === null ) ? ' inactive' : '')}>
          <div className={'bgDiv'}>
            <img alt='error' style={{top: this.state.fromTop}} id="bg-image" src={bgWires} onLoad={() => {
                this.setState({bgLoaded: true});
              }
            } />
            <div id="header-container" className={dropOpen ? "open" : ''}>
              <Link to='/'>
                <img src={logo} onClick = {this.linkClick} id="App-logo" alt="logo" />
              </Link>
              <div id="nav-bar">
                {renderMenus()}
              </div>
            </div>
            <AuthBox 
              cascadeCheck={cascadeCheck}
              returnToTop={returnToTop}
              authState={authState}
            />
            <div id="open-menu-div"><img onClick={() => openMenu()} className={dropOpen ? 'open' : ''} alt = 'error' id="open-menu-button" src={popButton} /></div>
            <MainApp 
              tutorRecommendation = {tutorRecommendation}
              id="main-wrapper"
              isUp={isUp}
              clicked={clicked}
              user={user}
              mountFunct={() => this.setState({show:true})} 
              unmountFunct={() => this.setState({show:false})} 
              in={show}
              dim={dropOpen || authOpen }
              returnToTop={returnToTop}
              name={personal.name}
              isClicked={isClicked}
              authState={authState}
            />
          </div>
          <BottomBar returnToTop={returnToTop} />
          <AuthModal 
            visible={newUser} 
            onClose={closeModal}
          />
        </div>
      </BrowserRouter>
    );
  }
});