import "./home-intro.css";

const HomeIntro = () => {
  return (
    <div className="intro">
      <section className="intro-left">
        <h1>
          A platform that helps Schools{" "}
          <span className="purple">Employ Qualified</span> Teachers Easily
        </h1>
        <div>
          <p className="intro-left-heading">What Our Platform Will Do</p>
          <p>
            Making Refined and Qualified Teachers to all Schools in Nigeria is
            Our Priority. We intend to create a Platform That links Teachers to
            Schools. we intend to Create in the sense that the connection
            Between Schools and Teachers will be Just
          </p>
          <div className="intro-link">
            <a href="/" className="button ">
              A click away
            </a>
          </div>
        </div>
      </section>
      <div className="intro-right">
        <img
          src="/images/teacher.svg"
          alt="teacher illustration"
          id="home-image"
        />
      </div>
    </div>
  );
};

export default HomeIntro;
