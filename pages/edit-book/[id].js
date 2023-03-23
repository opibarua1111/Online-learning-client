import { CONST } from "@/constants";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const ExamQuestionEdit = () => {
  const router = useRouter();
  const pid = router.query;
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [book, setBook] = useState("");
  const [writer, setWriter] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  async function getbook() {
    // setIsLoading(true);
    await axios
      .post(CONST.API_SERVER + `/single-book/${pid.id}`, {
        "Content-Type": "text/plain",
      })
      .then((response) => {
        setBook(response.data[0]);
      })
      .catch((error) => {
        console.log("error", error);
      });
    // console.log("Got data " + rsp.data.result);
    setIsLoaded(true);
  }

  if (isLoaded === false) {
    getbook();
  }

  async function updateBook() {
    console.log("hit");
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name ? name : book.name);
    formData.append("writer", writer ? writer : book.writer);
    formData.append("status", status ? status : book.status);
    formData.append(
      "description",
      description ? description : book.description
    );
    await axios
      .post(CONST.API_SERVER + `/update-book/${book.id}`, formData, {
        "Content-Type": "text/plain",
      })
      .then(function (response) {
        if (response.status == 200) {
          window.location.href = "/";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    setIsLoaded(true);
  }

  if (showMessage) {
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  }

  return (
    <div class="container">
      {showMessage ? (
        <div className="col-md-12 p-5">
          <div className="card p-3"> {message} </div>
        </div>
      ) : null}

      <div class="row">
        <div class="col-lg-12">
          <div class="card b-radius--10">
            <div class="card-body p-10">
              <div className="row">
                <div className="col-md-12">
                  <p>Enter Book name </p>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    defaultValue={book?.name}
                  />
                </div>
                <div className="col-md-12">
                  <p>writer </p>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setWriter(e.target.value);
                    }}
                    defaultValue={book?.writer}
                  />
                </div>
                <div className="col-md-12">
                  <p>Description </p>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    defaultValue={book?.description}
                  />
                </div>
                <div className="col-md-12">
                  <p>Status </p>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <option selected>Select status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div className="col-md-12">
                  <br />
                  <center>
                    <button
                      className="btn btn--primary"
                      onClick={() => {
                        // if (book !== undefined && book.length > 0) {

                        // }
                        updateBook();
                      }}
                    >
                      {" "}
                      Update Book{" "}
                    </button>
                  </center>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamQuestionEdit;
