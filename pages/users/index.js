import { Card, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

import actions from "../../redux/actions";

import Layout from "../../components/Layout";

function Users(props) {
  const router = useRouter();

  const { users } = props;

//   console.log("[USERS]", users);

  return (
    <Layout title="Users">
      <Row>
        {users.data.map((user) => (
          <Col md="3" key={user.id}>
            <Card>
              <Card.Img variant="top" src={user.avatar} />
              <Card.Body>
                <Card.Title>
                  {user.first_name} {user.last_name}
                </Card.Title>
                <Card.Text>{user.email} </Card.Text>
                <Button
                  variant="primary"
                  onClick={(e) => router.push(`/users/${user.id}`)}
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  let res = await axios.get("https://reqres.in/api/users?page=1");

  const { data } = res;

  if (data.data.length === 0) {
    return { notFound: true };
  }

  return {
    props: { users: data },
    revalidate: 10,
  };
}

export default connect((state) => state, actions)(Users);
