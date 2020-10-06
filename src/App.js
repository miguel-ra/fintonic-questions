import React from "react";

function App() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>Browse</li>
            <li>Add New Questions</li>
            <li>API</li>
            <li>Discuss</li>
            <li>Login</li>
          </ul>
        </nav>
      </header>
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
