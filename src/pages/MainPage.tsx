import React from 'react';
import './style.css';
import MainNav from '../components/MainNav';
import MainUserInfo from '../components/MainUserInfo';
import MainList from '../components/MainList';

const MainPage = () => {
  return (
    <div className="mainpage-container">
      <MainUserInfo />
      {/* <MainNav /> */}
      <MainList />
    </div>
  );
};

export default MainPage;
