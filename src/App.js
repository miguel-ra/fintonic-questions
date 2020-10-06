import React from "react";
import Header from "./components/header/Header";

import { ReactComponent as IconBars } from "./assets/icons/bars.svg";
import { ReactComponent as IconPlus } from "./assets/icons/plus.svg";
import { ReactComponent as IconGears } from "./assets/icons/gears.svg";
import { ReactComponent as IconComments } from "./assets/icons/comments.svg";
import { ReactComponent as IconSignIn } from "./assets/icons/sign-in.svg";

const menuItems = [
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
      <main>
        <section>
          <h1>Browse Questions</h1>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Type</th>
                <th>Difficulty</th>
                <th>Question</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Category</td>
                <td>Type</td>
                <td>Difficulty</td>
                <td>Question</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default App;
