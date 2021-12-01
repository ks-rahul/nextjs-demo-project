import { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import actions from "../redux/actions";
import Layout from "../components/Layout";

function Login(props) {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.authenticate(
      { email: userData.email, password: userData.password },
      "login"
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
    <Layout title="sign in">
      <Card style={{ width: "20rem", margin: "50px auto" }}>
        <Card.Body>
          <Card.Title>Sign In</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={userData.password}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Layout>
  );
}

export default connect((state) => state, actions)(Login);
