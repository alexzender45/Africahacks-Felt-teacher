const SchoolRegistrationForm = () => {
  return (
    <form className="regform">
      <div className="group">
        <label>School Owner</label>
        <input type="text" name="text" className="input" />
      </div>
      <div className="group">
        <label> School Name</label>
        <input type="text" name="text" className="input" />
      </div>
      <div className="group">
        <label>School Address</label>
        <input type="text" name="text" className="input" />
      </div>
      <div className="group">
        {" "}
        <label>School Email</label>
        <input type="email" name="email" className="input" />
      </div>
      <div className="group">
        {" "}
        <label>School Reg No</label>
        <input type="number" name="number" className="input" />
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

export default SchoolRegistrationForm;
