const React = require('react');

function Edit(props) {
  const { log } = props;
  return (
    <form method="POST" action={`/logs/${log._id}/?_method=PUT`}>
      Title: <input type="text" name="title" defaultValue={log.name} />
      <br />
      Entry: <input type="text" name="entry" defaultValue={log.entry} />
      <br />
      Ship Is Broken:{' '}
      {log.shipIsBroken ? (
        <input type="checkbox" name="shipIsBroken" />
      ) : (
        <input type="checkbox" name="shipIsBroken" />
      )}
      <br />
      <input type="submit" value="Submit Edit(s)" />
    </form>
  );
}

module.exports = Edit;
