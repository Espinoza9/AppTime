import './App.css';
import Capitais from './Capitais';
import Search from './Search';

function App() {
  return (
    <div className="App">
      <Search placeholder='Digite Aqui' />
      <Capitais />
    </div>
  );
}
export default App;