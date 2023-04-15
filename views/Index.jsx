const React = require('react');

function Index(props) {
  const { logs } = props;

  return (
    <div>
      <a href="/logs/new">Create/Log an Entry to the Captain's Log</a>
      <ul>
        {logs.map((log, index) => {
          return <li>Title: {log.title}</li>;
        })}
      </ul>
    </div>
  );
}

module.exports = Index;
