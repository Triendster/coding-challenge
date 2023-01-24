import './App.css';
import Navbar from './components/Navbar';
import MainView from './components/MainView';
import Comparison from './components/Comparison';

function App() {
  return (
    <section className='App'>
      <Navbar></Navbar>
      <MainView></MainView>
      <Comparison></Comparison>
    </section>
  );
}

export default App;
