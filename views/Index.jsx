const React = require('react');

function Index(props) {
  const { logs } = props;

  return (
    <div>
      <a href="/logs/new">Create/Log an Entry to the Captain's Log</a>
      <h1>Index of Logged Entries</h1>
      <ul>
        {logs.map((log, index) => {
          return (
            <div>
              <li key={log._id}>
                Title: <a href={`/logs/${log._id}`}>{log.title}</a>
                <br />
                Entry: {log.entry}
                <br />
                Ship is broken:{' '}
                {log.shipIsBroken ? 'Yes' : 'No, ship is in good condition'}
                <br />
                {/* Timestamp: {timestamps.createdAt} */}
                <form method="POST" action={`/logs/${log._id}?_method=DELETE`}>
                  <input type="submit" value="Delete" />
                </form>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

module.exports = Index;
