import './App.css';
import NavBar from './components/navbar';
import HomeIntro from './components/home-intro';
import HomeDetails from './components/home-details';
import AppBanner from './components/app-banner';

function App() {
  return (
    <div className="App">
      <NavBar />
      <HomeIntro />
      <HomeDetails />
      <AppBanner />
    </div>
  );
}

export default App;
