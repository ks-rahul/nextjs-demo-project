import { useState,useEffect } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import actions from "../redux/actions";

function Signup(props) {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    props.register(
      {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
      },
      "register"
    );
  };

  useEffect(() => {
    const tc = localStorage.getItem("token");

    if (tc !== undefined && tc !== null && tc !== "") {
      console.log(tc);
      router.replace("/");
    }
  }, [router]);

  return (
    <Layout title="Sign Up">
      <Card style={{ width: "20rem", margin: "50px auto" }}>
        <Card.Body>
          <Card.Title>Sign Up</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ..."
                    value={userData.firstName}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ..."
                    value={userData.lastName}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
              <Col md="12" className="mt-3">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter ..."
                    value={userData.email}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
              <Col md="12" className="mt-3">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter ..."
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
              <Col md="12" className="mt-3">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Layout>
  );
}

export default connect((state) => state, actions)(Signup);
