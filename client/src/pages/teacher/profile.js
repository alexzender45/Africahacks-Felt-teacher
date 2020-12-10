import "./profile.css";
import NavComponent from "../.././components/nav-component.js";

const Profile = () => {
  return (
    <>
      <NavComponent />
      <div className="profile">
        <div className="profile-left">
          <div className="profile-left-top">
            <div className="profile-image">
                          <img src="/images/big-profile.svg" alt="" id="big-profile" />
                          <div className='center'>
                          <p className="button"> Add Profile Picture </p>
                          </div>
              
              <p>Status</p>
              <p>
                <img src="/images/approved.svg" alt="" className="icons-s" />
                Approved
              </p>
              <p>
                <img src="/images/unapproved.svg" alt="" className="icons-s" />
                Unapproved
              </p>
            </div>
            <div className="profile-name">
              <p className='big name'>Name Name</p>
              <div className="profile-icons">
                <div className="icons-div">
                  <img src="/images/location.svg" alt="" className="icon" />
                </div>
                Address: No. 16 oluwaseyi street Isasi Ojo Lagos.
              </div>
              <div className="profile-icons">
                <div className="icons-div">
                  <img src="/images/call.svg" alt="" className="icon" />
                </div>
                Contact: 08154746900, 07017171062. Copy
              </div>
              <div className="profile-icons">
                <div className="icons-div">
                  <img src="/images/mail.svg" alt="" className="icon" />
                </div>
                Email: centurionconfidence@gmail.com.
              </div>
            </div>
          </div>
          <div className="profile-left-bottom">
            <div className="plbr">
              <p className='big'>About <span className='purple'>Teacher</span></p>
              <p>
                A person who is willing to any changing circumstances and able
                to work in a friendly environment.
              </p>
              <div className="center half">
                <p className=" button">Update Profile</p>
              </div>
              <p>Subjects Taken</p>
              <p>Mathematics</p>
              <p>Physics</p>
            </div>
            <div className="plbr plbl center">
              <p>My Social Media Platforms</p>
              <div className="socials">
                <img src="/images/facebook.svg" alt="" className="icon" />
                <img src="/images/twitter.svg" alt="" className="icon" />
                <img src="/images/instagram.svg" alt="" className="icon" />
                <img src="/images/behance.svg" alt="" className="icon" />
                <img src="/images/google.svg" alt="" className="icon" />
              </div>
              <div className='center'><p className=" button round-s">Take Test</p></div>
                          <img src="/images/box.svg" alt="" />
                          <div className='center'><p className=" button round-s">upload video</p></div>
              
            </div>
          </div>
        </div>
        <div className="profile-right">
          <div className="button round-s plbr bb">
            <p>Date of Birth</p>
            <p>Years of Experience</p>
            <p>Qualifications</p>
            <p>State</p>
            <p>Country</p>
            <p>Level of Education</p>
            <p>Course of Study</p>
            <p>Grade</p>
            <p>School Document</p>
            <p>Interested Subject</p>
            <p>GPA</p>
            <p></p>
          </div>
          <div className='connect'>
            <p className=" button round-s">Connect</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
