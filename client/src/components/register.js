import "./register.css";
import SchoolRegistrationForm from "./school-registration-form";
import TeacherRegistrationForm from "./teacher-registration-form";

const RegisterForm = ({ category }) => {
  return (
    <>
      <div className="topbar"></div>
      <div className="container register">
        <div className="top purple">
          <img src="/images/logo.svg" alt="felt teaher logo" />
          CREATE ACCOUNT
        </div>
        {category === "teacher" ? (
          <TeacherRegistrationForm />
        ) : (
          <SchoolRegistrationForm />
        )}
      </div>
    </>
  );
};

export default RegisterForm;
