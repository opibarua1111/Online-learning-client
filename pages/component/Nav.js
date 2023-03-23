import { signOut, useSession } from "next-auth/react";

const Nav = () => {
  const session = useSession();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/">
          ONLINR Learning
        </a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/createBook"
              >
                create-book
              </a>
            </li>
            <li classNameName="nav-item me-auto">
              {session.status == "authenticated" && (
                <a
                  className="nav-link active"
                  onClick={() => signOut()}
                  aria-current="page"
                  href="/login"
                >
                  SignOut
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
