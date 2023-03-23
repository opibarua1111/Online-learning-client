import { CONST } from "@/constants";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";

function Login() {
  const session = useSession();
  console.log(session);
  useEffect(() => {
    if (session.status === "authenticated") Router.replace("/");
  }, [session.status]);
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState("");

  const findUser = async () => {
    await axios
      .get(CONST.API_SERVER + "/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        const name = response.data[0].name;
        const email = response.data[0].email;
        const id = response.data[0].id;
        const payload = { id, name, email };
        signIn("credentials", { ...payload, redirect: false });
      })
      .catch(function (error) {
        console.log("errors", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("loginAction", "true");
    formData.append("email", email);
    formData.append("password", password);
    const rsp = await axios
      .post(CONST.API_SERVER + "/login", formData, {
        "Content-Type": "text/plain",
      })
      .then(function (response) {
        setToken(response.data.success.token);
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (isLoading == true) {
      findUser();
    }
  };

  return (
    <>
      <div className="container-fluid loginScreen">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="signup-box">
              <h3 className="text-center">Log In</h3>
              <br />
              <hr />
              <form onSubmit={handleSubmit}>
                <div className="message"> </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    password
                  </label>
                  <input
                    class="form-control"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
              <br />
              <p className="text-center">Or</p>
              <a href="/register">
                <p className="text-center">Don't Have an Account ?</p>
              </a>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default Login;

async function loginUser(credentials) {
  return fetch(CONST.API_SERVER + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
