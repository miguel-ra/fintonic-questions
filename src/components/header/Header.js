import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import classes from "./Header.module.scss";

function Header({ items }) {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className={classes.item}>
              <Icon className={cx(Icon.className, classes.icon)} /> {label}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

Header.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType,
      label: PropTypes.string,
    })
  ).isRequired,
};

export default Header;
