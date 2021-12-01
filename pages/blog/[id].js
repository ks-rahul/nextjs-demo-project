import { Card, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";

import actions from "../../redux/actions";

import Layout from "../../components/Layout";

function BlogView(props) {
  // console.log("[BLOG VIEW]", props);

  const { blogData } = props;

  if (!blogData) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout title={blogData.title}>
      <Row>
        <Col>
          <Card>
            <Card.Img
              style={{ width: "200px", height: "200px", margin: "auto" }}
              variant="top"
              src={`https://robohash.org/${blogData.id}?set=set2&size=200x200`}
            />
            <Card.Body>
              <Card.Title>{blogData.title}</Card.Title>
              <Card.Text>{blogData.body} </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  let res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  let { data } = res;

  if (!data) {
    return { notFound: true };
  }

  return {
    props: { blogData: data },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  let res = await axios.get("https://jsonplaceholder.typicode.com/posts");

  let paths = res.data
    .filter((b, i) => i < 6)
    .map((item) => ({ params: { id: `#{item.id}` } }));

  return {
    paths: paths,
    fallback: true,
  };
}

export default connect((state) => state, actions)(BlogView);
