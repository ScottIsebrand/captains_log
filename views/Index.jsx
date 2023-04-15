const React = require('react');

function Index(props) {
  const { logs } = props;

  return (
    <div>
      <ul>
        {logs.map((log, index) => {
          return <li>Title: {log.title}</li>;
        })}
      </ul>
    </div>
  );
}

module.exports = Index;
