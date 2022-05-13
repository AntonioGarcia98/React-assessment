import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";
import "./../styles/NabvarItem.css";

export default function NavbarItem(props) {
  const { history, showReturn } = props;

  return (
    <>
      <Navbar bg="dark">
        {showReturn ? (
          <div onClick={() => history.push("/")}>
            <FaAngleLeft className="icon" />
            <span>Return</span>{" "}
          </div>
        ) : (
          ""
        )}

        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/oracle.png"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}
