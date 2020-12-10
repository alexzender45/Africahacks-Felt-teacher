const CompleteProfile = () => {
  return (
    <>
      <div className="topbar"></div>
      <div className="container register">
        <div className="top">
          <img src="/images/logo.svg" alt="felt teaher logo" />
          Complete your profile
        </div>
        <form>
          <label>
            <input
              type="text"
              name="dob"
              className="input"
              placeholder="Date of Birth"
            />
          </label>
          <label>
            <input
              type="text"
              name="experience"
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
              name="qualifications"
              className="input"
              placeholder="Qualifications"
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
            <input
              type="file"
              name="cert"
              className="input"
              placeholder="cert"
            />
          </label>
          <label>
            <input
              type="file"
              name="pic"
              className="input"
              placeholder="Picture"
            />
          </label>
          <label>
            <input
              type="text"
              name="text"
              className="input"
              placeholder="Level of education"
            />
          </label>
          <label>
            <input
              type="text"
              name="text"
              className="input"
              placeholder="Course of study"
            />
          </label>
          <label>
            <input
              type="text"
              name="text"
              className="input"
              placeholder="Grade"
            />
          </label>
          <label>
            <input
              type="text"
              name="text"
              className="input"
              placeholder="School document"
            />
          </label>
          <label>
            <input
              type="text"
              name="text"
              className="input"
              placeholder="interested subject"
            />
          </label>
          <label>
            <input
              type="text"
              name="text"
              className="input"
              placeholder="GPA"
            />
          </label>
            <input type='submit' value='LOGIN' className='button submit'/>
        </form>
      </div>
    </>
  );
};

export default CompleteProfile;
