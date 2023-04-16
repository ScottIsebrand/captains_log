const React = require('react');

function Home() {
  return (
    <div>
      <h1>Captain's Log</h1>

      <a href="/logs">Go to Index of Logged Entries</a>
      <br />
      <br />
      <a href="/logs/new">Create an Entry to the Captain's Log</a>
    </div>
  );
}

module.exports = Home;
