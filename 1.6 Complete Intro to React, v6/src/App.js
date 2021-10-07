import ReactDOM from 'react-dom';
import Pet from './Pet';

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Pet name="luna" animal="dog" breed="havanese" />
      <Pet name="loki" animal="bird" breed="australian" />
      <Pet name="sudo" animal="cat" breed="persian" />
    </div>
  )
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));