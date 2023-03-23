import { CONST } from "@/constants";
import axios from "axios";
import { useState } from "react";
function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [c_password, setCPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("c_password", c_password);

    const rsp = await axios
      .post(CONST.API_SERVER + "/register", formData, {
        "Content-Type": "text/plain",
      })
      .then(function (response) {
        if (response.status == 200) {
          window.location.href = "/login";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <div class="signup-box">
            <h3 class="text-center">Sign Up</h3>
            <br />
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="message"> </div>
              <div class="mb-3">
                <label class="form-label">Full Name</label>
                <input
                  class="form-control"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  class="form-control"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input
                  class="form-control"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Retype Password</label>
                <input
                  class="form-control"
                  type="password"
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Signup
              </button>
              <p>
                <a href="/login">Already have an account ?</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Signup;
