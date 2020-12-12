import "./all-teachers.css";
import NavComponent from '../components/nav-component';
import { useEffect, useState } from "react";

const AllTeachers = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('English');
  const details = {
    src: "/images/tiny-p.svg",
    name: "Degoke FineBoy",
    description: "A willing person that is always ready to code work",
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(
          `https://felt-teacher.herokuapp.com/api/teachers/${category}`,
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
          console.log(result.data[0])
          setData(result.data);
        } else {
          alert(result.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);

    return (
        <>
            <NavComponent />
    <div className="wrapper">
      <div className="all-top">
        <div className="top ot">
          <p className="round button">Our Tutors</p>
          <label>
            <select type="text" className="select" name="category" onChange={(e) => setCategory(e.target.value)}>
              <option value="English" >English</option>
              <option value="Biology" >Biology</option>
              <option value="Mathematics" >Mathemathics</option>
                  <option value="Government" >Government</option>
                  <option value="Account" >Account</option>
                  <option value="Physics" >Physics</option>
                  <option value="Chemistry" >Chemistry</option>
                  <option value="Geography" >Geography</option>
                  <option value="EnglishLiterature" >English Literature</option>
                  <option value="ChristianReligiousStudies" >Christian Religious Studies</option>
                  <option value="Economics" >Economics</option>
                  <option value="IslamicReligiousStudies" >Islamic Religious Studies</option>
                  <option value="CivicEducation" >Civic Education</option>
                  <option value="History" >History</option>
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
            {data.map((teacher) => (
               <div className="box button big-button">
               <div className="set det">
                 <img src={details.src} alt="" />
                 <div>
                    <p>{ teacher.fullname}</p>
                   <p>{teacher.about}</p>
                 </div>
               </div>
               <div className="set">
                 <p className='button white'>Connect</p>
                 <p className='button'>Profile</p>
               </div>
             </div>
            ))}
              
                 
                </div>
                <p className='button round-s more'>See more</p>
        </div>
        <div className='bottom-bar'></div>
            </>
  );
};

export default AllTeachers;
