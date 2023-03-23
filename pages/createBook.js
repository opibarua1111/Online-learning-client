import { CONST } from "@/constants";
import axios from "axios";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";

const createBook = () => {
  const session = useSession();
  useEffect(() => {
    if (session.status === "unauthenticated") Router.replace("/login");
  }, [session.status]);
  const [name, setName] = useState();
  const [writer, setWriter] = useState();
  const [des, setDes] = useState();

  async function submitForm() {
    const formData = new FormData();
    formData.append("action", "addBook");
    formData.append("name", name);
    formData.append("writer", writer);
    formData.append("description", des);

    const rsp = await axios
      .post(CONST.API_SERVER + "/store-book", formData, {
        "Content-Type": "text/plain",
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="container">
        <div>
          <div className="row align-items-center mb-3 justify-content-center">
            <div className="col-lg-8">
              <h3> Add New Exam </h3>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body p-10">
                  <div className="row">
                    <div className="col-md-12">
                      <p>Enter book name/title </p>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        required
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <p>Enter writer name </p>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        required
                        onChange={(e) => {
                          setWriter(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <p>Enter Description </p>
                      <textarea
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        required
                        onChange={(e) => {
                          setDes(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <center>
                        <button
                          className="btn btn-primary mt-4"
                          onClick={() => {
                            submitForm();
                          }}
                        >
                          Add book
                        </button>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default createBook;
