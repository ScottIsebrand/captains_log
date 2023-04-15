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
        shipIsBroken:{' '}
        {log.shipIsBroken ? 'Yes, broken' : 'Ship is worthy, not broken'}
      </p>
    </div>
  );
}

module.exports = Show;
