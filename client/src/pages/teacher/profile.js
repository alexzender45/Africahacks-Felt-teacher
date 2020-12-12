import "./profile.css";
import NavComponent from "../.././components/nav-component.js";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { withAuth } from '../.././components/utils';

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
                <Link to={`/teacher/complete-profile/${data.username}`} className="button"> Add Profile Picture </Link>
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
              <div className="center">
                <Link to={`/teacher/complete-profile/${data.username}`} className="button">Update Profile</Link>
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
            <p><span className='dark'>Date of Birth:</span>{data.dateOfBirth}</p>
            <p><span className='dark'>State: </span>{data.state}</p>
            <p><span className='dark'>Country:</span>Country: {data.country}</p>
            <p><span className='dark'>Level of Education:</span> {data.levelOfEducation}</p>
            <p><span className='dark'>Course of Study:</span> {data.courseOfStudy}</p>
            <p><span className='dark'>Grade:</span> {data.grade}</p>
            <p><span className='dark'>Gpa:</span> {data.gpa}</p>
            <p><span className='dark'>Grade:</span> {data.grade}</p>
          </div>
          <div className="connect button round-s center">
            <p>Connect</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Profile);
