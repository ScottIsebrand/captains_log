const React = require('react');

function New() {
  return (
    <div>
      <h1>Create New Ship-Status</h1>
      <form action="/logs" method="POST">
        Title: <input type="text" name="title" />
        <br />
        Entry: <textarea name="entry" rows="4" cols="15" />
        <br />
        Ship Is Broken: <input type="checkbox" name="shipIsBroken" />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

module.exports = New;
