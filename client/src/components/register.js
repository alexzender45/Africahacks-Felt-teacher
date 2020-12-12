import "./register.css";
import SchoolRegistrationForm from "./school-registration-form";
import TeacherRegistrationForm from "./teacher-registration-form";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import NavComponent from "./nav-component";

const RegisterForm = ({ category }) => {
  const [data, SetData] = useState({});
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.conpassword) {
      return console.log("password no match");
    }

    try {
      const response = await fetch(
        "https://felt-teacher.herokuapp.com/api/teachers",
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }
      );

      const result = await response.json()

      if (result.status === 'success') {
        history.push('/teacher/login')
      }
      else {
        alert(result.message)
      }
    }
    catch (err) {
      console.log(err)
    }

    console.log(data);
  };

  const handleChange = (e) => {
    const names = e.target.name;
    const value = e.target.value;

    if (names === "number") {
      SetData((prev) => {
        return { ...prev, [names]: value, phone: prev.suffix + e.target.value };
      });
    }

    SetData((prev) => {
      return { ...prev, [names]: value };
    });
  };

  return (
    <>
      
      <NavComponent />
      <div className="container register">
        <div className="top purple">
          <img src="/images/logo.svg" alt="felt teaher logo" />
          CREATE ACCOUNT
        </div>
        {category === "teacher" ? (
          <TeacherRegistrationForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <SchoolRegistrationForm handleChange={handleChange}
            handleSubmit={handleSubmit}/>
        )}
      </div>
    </>
  );
};

export default RegisterForm;
