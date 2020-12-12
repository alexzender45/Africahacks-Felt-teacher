import NavBar from "../components/navbar";
import HomeIntro from "../components/home-intro";
import HomeDetails from "../components/home-details";
import AppBanner from "../components/app-banner";
import "./home.css";

function Home() {
  return (
    <div className="App">
      <NavBar />
      <HomeIntro />
      <div className="home-mid">
        <p className="bt center"> Why choose us</p>
        <p>We offer</p>
        <div className="low-mid center">
          <div className="sets">
            <img src="/images/cap.svg" alt="" />
            <div>
              <p className="bigg">80%</p>
              <p>qualified teachers</p>
            </div>
          </div>
          <div className="sets">
            <img src="/images/school.svg" alt="" />
            <div>
              <p className="bigg">90%</p>
              <p>Approved Schools</p>
            </div>
          </div>
        </div>
      </div>
      <HomeDetails />
      <AppBanner />
    </div>
  );
}

export default Home;
