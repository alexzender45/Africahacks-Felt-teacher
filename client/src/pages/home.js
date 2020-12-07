
import NavBar from '../components/navbar';
import HomeIntro from '../components/home-intro';
import HomeDetails from '../components/home-details';
import AppBanner from '../components/app-banner';

function Home() {
  return (
    <div className="App">
      <NavBar />
      <HomeIntro />
      <HomeDetails />
      <AppBanner />
    </div>
  );
}

export default Home;
