

const TeacherRegistrationForm = () => {

  return (
    <form className="regform">
      <div className="group">
        <label> Name</label>
        <input type="text" name="text" className="input" />
      </div>
      <div className="group">
        <label>Username</label>
        <input type="text" name="text" className="input" />
      </div>
      <div className="group">
        {" "}
        <label>Email</label>
        <input type="email" name="email" className="input" />
      </div>
      <div className="group">
        {" "}
        <label>Phone Number</label>
        <div className="tel">
          <input
            type="tel"
            name="suffix"
            className="input"
            placeholder="+234"
          />
          <input type="tel" name="number" className="input" />
        </div>
      </div>
      <div className="group">
        <label>Password</label>
        <input type="password" name="password" className="input" />
      </div>
      <div className="group">
        <label>Confirm Password</label>
        <input type="password" name="password" className="input" />
      </div>
      <div className="group">
        <label></label>
        <input type="submit" value="CREATE ACCOUNT" className="button submit" />
      </div>
    </form>
  );
};

export default TeacherRegistrationForm;
