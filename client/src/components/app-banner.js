import "./app-banner.css";

const AppBanner = () => {
  return (
    <div className="banner">
      <div className="banner-left">
        <p>You can also Download our App for Free Get It on</p>
        <div className="store-links">
          <div>
            <a href="/" className="store">
              <span>
                <img src="/images/apple.svg" alt="" className="icon" />
              </span>
              APP STORE
            </a>
          </div>
          <div>
            <a href="/" className="store">
              <span>
                <img src="/images/google-play.svg" alt="" className="icon" />
              </span>
              GOOGLE PLAY
            </a>
          </div>
        </div>
      </div>
      <div className="banner-phone">
        <img src="/images/phone.svg" alt="" className="phone" />
      </div>
      <div className="banner-right">
        <p>You can also contact us on our Social media platform</p>
        <div className="social">
          <img src="/images/twitter.svg" alt="" className="icon" />
          <img src="/images/instagram.svg" alt="" className="icon" />
          <img src="/images/facebook.svg" alt="" className="icon" />
        </div>
      </div>
    </div>
  );
};

export default AppBanner;
