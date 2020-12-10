import "./all-teachers.css";
import NavComponent from '../components/nav-component';

const AllTeachers = () => {
  const details = {
    src: "/images/p-image.svg",
    name: "Degoke FineBoy",
    description: "A willing person that is always ready to code work",
  };

    return (
        <>
            <NavComponent />
    <div className="wrapper">
      <div className="all-top">
        <div className="top ot">
          <p className="round button">Our Tutors</p>
          <label>
            <select type="text" className="select" name="category">
              <option defaultValue="">Search by subject</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <p>
          We employ highly experienced and qualified teachers who set the ground
          for all our courses. They are aimed to help you achieve more on your
          path to success.
        </p>
      </div>

      <div className="boxes">
      <div className="box button big-button">
          <div className="set">
            <img src={details.src} alt="" />
            <div>
              <p>{details.name}</p>
              <p>{details.description}</p>
            </div>
          </div>
          <div className="set">
            <p>Connect with patient</p>
            <p>View profle</p>
          </div>
        </div>
        <div className="box button big-button">
          <div className="set">
            <img src={details.src} alt="" />
            <div>
              <p>{details.name}</p>
              <p>{details.description}</p>
            </div>
          </div>
          <div className="set">
            <p>Connect with patient</p>
            <p>View profle</p>
          </div>
        </div>
        <div className="box button big-button">
          <div className="set">
            <img src={details.src} alt="" />
            <div>
              <p>{details.name}</p>
              <p>{details.description}</p>
            </div>
          </div>
          <div className="set">
            <p>Connect with patient</p>
            <p>View profle</p>
          </div>
        </div>
                </div>
                <p className='button round-s more'>See more</p>
        </div>
        <div className='bottom-bar'></div>
            </>
  );
};

export default AllTeachers;
