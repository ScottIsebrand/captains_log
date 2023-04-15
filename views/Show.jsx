const React = require('react');

function Show(props) {
  const { log } = props;

  return (
    <div>
      <a href="/logs">Go to Index of Captain's Log</a>
      <p>
        Title: {log.title}
        <br />
        Entry: {log.entry}
        <br />
        Ship Is Broken:{' '}
        {log.shipIsBroken ? 'Yes, broken' : 'No, ship is in good condition'}
      </p>
    </div>
  );
}

module.exports = Show;
