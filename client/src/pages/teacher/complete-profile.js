import { useRef } from "react";

const CompleteProfile = () => {
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const forms = document.getElementById('form')

    const formData = new FormData(forms);
    console.log(form.current)
    console.log(formData)

    const response = await fetch(
      "https://felt-teacher.herokuapp.com/api/teachers/me",
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    const result = await response.text()

    console.log(result)
  };
  return (
    <>
      <div className="topbar"></div>
      <div className="container register">
        <div className="top">
          <img src="/images/logo.svg" alt="felt teaher logo" />
          Complete your profile
        </div>
        <form ref={form} id='form' onSubmit={handleSubmit} >
        <label>
            <input
              type="text"
              name="fullname"
              className="input"
              placeholder="Name"
            />
          </label>
          <label>
            <input
              type="text"
              name="dateOfBirth"
              className="input"
              placeholder="Date of Birth"
            />
          </label>
          <label>
            <input
              type="text"
              name="yearsOfExprience"
              className="input"
              placeholder="Years of Experience"
            />
          </label>
          <label>
            <input
              type="text"
              name="school"
              className="input"
              placeholder="School"
            />
          </label>
          <label>
            <input
              type="text"
              name="about"
              className="input"
              placeholder="Short description..."
            />
          </label>
          <div>
            <label>
              <input
                type="text"
                name="state"
                className="input"
                placeholder="State"
              />
            </label>
            <label>
              <input
                type="text"
                name="country"
                className="input"
                placeholder="Country"
              />
            </label>
          </div>
          <label>
            <input type="file" name="image" className="input" />
          </label>
          <label>
            <input
              type="text"
              name="levelOfEducation"
              className="input"
              placeholder="Level of education"
            />
          </label>
          <label>
            <input
              type="text"
              name="courseOfStudy"
              className="input"
              placeholder="Course of study"
            />
          </label>
          <label>
            <input
              type="text"
              name="grade"
              className="input"
              placeholder="Grade"
            />
          </label>

          <label>
            <input
              type="text"
              name="interested_subject"
              className="input"
              placeholder="interested subject"
            />
          </label>
          <label>
            <input
              type="text"
              name="gpa"
              className="input"
              placeholder="GPA"
            />
          </label>
          <input type="submit" value="UPDATE" className="button submit" />
        </form>
      </div>
    </>
  );
};

export default CompleteProfile;
