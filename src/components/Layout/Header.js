import React, { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
  <Fragment>
    <header className={classes.header}>
      <h1>Desi Bazaar</h1>
      <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
    </header>
    <div className={classes['main-image']}>
      <img src={mealsImage} alt="mealsImg" />
    </div>
  </Fragment>
  )
};

export default Header;
