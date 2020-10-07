import React from "react";
import Header from "./components/header/Header";
import Questions from "./containers/questions/Questions";
import classes from "./App.module.scss";

import { ReactComponent as IconBars } from "./assets/icons/bars.svg";
import { ReactComponent as IconPlus } from "./assets/icons/plus.svg";
import { ReactComponent as IconGears } from "./assets/icons/gears.svg";
import { ReactComponent as IconComments } from "./assets/icons/comments.svg";
import { ReactComponent as IconSignIn } from "./assets/icons/sign-in.svg";

export const menuItems = [
  { icon: IconBars, label: "Browse" },
  { icon: IconPlus, label: "Add New Questions" },
  { icon: IconGears, label: "API" },
  { icon: IconComments, label: "Discuss" },
  { icon: IconSignIn, label: "Login" },
];

function App() {
  return (
    <>
      <Header items={menuItems} />
      <main className={classes.main}>
        <Questions />
      </main>
    </>
  );
}

export default App;
