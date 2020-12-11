import "./profile.css";
import NavComponent from "../.././components/nav-component.js";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Profile = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(
          "https://felt-teacher.herokuapp.com/api/teachers/me",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (result.status === "success") {
          setData(result.data);
        } else {
          alert(result.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <NavComponent />
      <div className="profile">
        <div className="profile-left">
          <div className="profile-left-top">
            <div className="profile-image">
              <img src="/images/big-profile.svg" alt="" id="big-profile" />
              <div className="center">
                <p className="button"> Add Profile Picture </p>
              </div>

              <p>Status</p>
              {data.approved ? (
                <p>
                  <img src="/images/approved.svg" alt="" className="icons-s" />
                  Approved
                </p>
              ) : (
                <p>
                  <img
                    src="/images/unapproved.svg"
                    alt=""
                    className="icons-s"
                  />
                  Unapproved
                </p>
              )}
            </div>
            <div className="profile-name">
              <p className="big name">{data.fullname}</p>
              <div className="profile-icons">
                <div className="icons-div">
                  <img src="/images/location.svg" alt="" className="icon" />
                </div>
                Address: {data.address}.
              </div>
              <div className="profile-icons">
                <div className="icons-div">
                  <img src="/images/call.svg" alt="" className="icon" />
                </div>
                Contact: {data.phone}
              </div>
              <div className="profile-icons">
                <div className="icons-div">
                  <img src="/images/mail.svg" alt="" className="icon" />
                </div>
                Email: {data.email}
              </div>
            </div>
          </div>
          <div className="profile-left-bottom">
            <div className="plbr">
              <p className="big">
                About <span className="purple">Teacher</span>
              </p>
              <p>
                {data.about}
              </p>
              <div className="center half">
                <Link to={`/teacher/complete-profile/${data.username}`} className=" button">Update Profile</Link>
              </div>
              <p>Subjects Taken</p>
              <p>{data.interested_subject}</p>
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
              <div className="center">
                <p className=" button round-s">Take Test</p>
              </div>
              <img src="/images/box.svg" alt="" />
              <div className="center">
                <p className=" button round-s">upload video</p>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-right">
          <div className="button round-s plbr bb">
            <p>{data.dateOfBirth}</p>
            <p>Years of Experience</p>
            <p>Qualifications</p>
            <p>{data.state}</p>
            <p>{data.country}</p>
            <p>{data.levelOfEducation}</p>
            <p>{data.courseOfStudy}</p>
            <p>{data.grade}</p>
            <p>{data.school_document}</p>
            <p>{data.gpa}</p>
            <p>{data.grade}</p>
          </div>
          <div className="connect">
            <p className=" button round-s">Connect</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
