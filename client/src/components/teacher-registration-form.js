

const TeacherRegistrationForm = ({handleChange, handleSubmit}) => {

  return (
    <form className="regform" method='POST' onSubmit={handleSubmit}>
      <div className="group">
        <label> Name</label>
        <input type="text" name="fullname" className="input" onChange={handleChange}/>
      </div>
      <div className="group">
        <label>Username</label>
        <input type="text" name="username" className="input" onChange={handleChange}/>
      </div>
      <div className="group">
        {" "}
        <label>Email</label>
        <input type="email" name="email" className="input" onChange={handleChange}/>
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
            onChange={handleChange}
          />
          <input type="tel" name="number" className="input" onChange={handleChange}/>
        </div>
      </div>
      <div className="group">
        <label>Password</label>
        <input type="password" name="password" className="input" onChange={handleChange}/>
      </div>
      <div className="group">
        <label>Confirm Password</label>
        <input type="password" name="conpassword" className="input" onChange={handleChange}/>
      </div>
      <div className="group">
        <label></label>
        <input type="submit" value="CREATE ACCOUNT" className="button submit" />
      </div>
    </form>
  );
};

export default TeacherRegistrationForm;
