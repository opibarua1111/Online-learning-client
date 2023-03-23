import { CONST } from "@/constants";
import axios from "axios";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";

const Home = () => {
  const session = useSession();
  useEffect(() => {
    if (session.status === "unauthenticated") Router.replace("/login");
  }, [session.status]);
  const [isLoading, setIsLoading] = useState(true);
  // const [courses, setCourses] = useState([]);
  const [books, setBooks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  async function getCourses() {
    try {
      setIsLoading(true);
      const rsp = await axios
        .post(CONST.API_SERVER + "/books", {
          "Content-Type": "text/plain",
        })
        .then((response) => {
          setBooks(response.data[0]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoaded === false) {
    setIsLoaded(true);
    getCourses();
  }

  const deleteExam = async (id) => {
    setIsLoading(true);
    const rsp = await axios
      .post(CONST.API_SERVER + `/delete-book/${id}`, {
        "Content-Type": "text/plain",
      })
      .then((response) => {
        setIsLoading(false);
        setIsLoaded(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isLoading ? <div className="LoaderClass"></div> : null}
      <div className="container pt-4">
        <div class=" row justify-content-center">
          <div class="col-lg-10">
            <div class="row align-items-center mb-30 justify-content-between">
              <div class="col-lg-8 col-sm-8">
                <h4> Books List </h4>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="card b-radius--10">
                  <div class="card-body p-10">
                    <div className="row">
                      <table className="table">
                        <thead>
                          <tr>
                            <th> SL </th>
                            <th> Book name </th>
                            <th> Writer </th>
                            <th> Description </th>
                            <th className="text-center"> Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {books.map((book, i) => (
                            <tr>
                              <td> {i + 1} </td>
                              <td>{book.name}</td>
                              <td> {book.writer} </td>
                              <td> {book.description} </td>
                              {/* <td> {course.uid} </td> */}
                              <td className="text-center">
                                <a href={"/edit-book/" + book.id}>
                                  <button className="btn btn-primary">
                                    Edit book
                                  </button>
                                </a>
                                &nbsp;
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    deleteExam(book.id);
                                  }}
                                >
                                  Delete exam
                                </button>{" "}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export default Home;
