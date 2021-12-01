import { Card, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import connectInitialProps from 'connect-initial-props';

import actions from "../../redux/actions";

import Layout from "../../components/Layout";

function UserView(props) {
  const {
    userData: { data },
  } = props;

  return (
    <Layout title="User View">
      <Row>
        <Col>
          <Card>
            <Card.Img
              style={{ width: "200px", height: "200px", margin: "auto" }}
              variant="top"
              src={data.avatar}
            />
            <Card.Body>
              <Card.Title>
                {data.first_name} {data.last_name}
              </Card.Title>
              <Card.Text>{data.email} </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

// UserView.getInitialProps = async (ctx) => {
//   const { store, query, res } = ctx;

//   console.log("[GET INITIAL PROPS]", store);

//   return { userData: { data: {} } };
// };

export async function getServerSideProps(ctx) {
  const { params } = ctx;

  console.log("[GET SERVER SIDE PROPS]", ctx.params);

  let res = await axios.get(`https://reqres.in/api/users/${params.id}`);

  const { data } = res;

  if (!data.data) {
    return { notFound: true };
  }

  return {
    props: { userData: data },
  };
}

export default connect((state) => state, actions)(UserView);
