import logo from './logo.svg';
import './App.css';
import ImageIdentification from './component/ImageIdentification';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span>Image Recognition</span>
        <ImageIdentification></ImageIdentification>
        
      </header>
    </div>
  );
}

export default App;
