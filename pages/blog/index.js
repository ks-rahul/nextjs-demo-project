import { Card, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

import actions from "../../redux/actions";

import Layout from "../../components/Layout";

function Blogs(props) {
  // console.log("[BLOG COMPONENT]", props);
  const router = useRouter();

  const { blogs } = props;

  return (
    <Layout title="Blogs">
      <Row>
        {blogs.map((item) => (
          <Col md="3" key={item.id}>
            <Card>
              <Card.Img
                variant="top"
                src={`https://robohash.org/${item.id}?set=set2&size=180x180`}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.body} </Card.Text>
                <Button
                  variant="primary"
                  onClick={(e) => router.push(`/blog/${item.id}`)}
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
  let res = await axios.get("https://jsonplaceholder.typicode.com/posts");

  let data = res.data.filter((b, i) => i < 6);

  // if (!data) {
  //   return {
  //     redirect: {
  //       destination: "/no-data",
  //     },
  //   };
  // }

  if (data.length === 0) {
    return { notFound: true };
  }

  return {
    props: { blogs: data },
    revalidate: 10,
  };
}

export default connect((state) => state, actions)(Blogs);
