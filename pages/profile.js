import { useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { connect, useSelector } from "react-redux";

import actions from "../redux/actions";

import Layout from "../components/Layout";
import ErrorBoundary from "../components/ErrorBoundaries";

function Profile(props) {
  const data = useSelector((state) => state.authentication);

  useEffect(() => {
    if (!data.user) {
      props.getUserData(2);
    }
  }, [data.user, props.getUserData]);

  if (!data.user) {
    return (
      <Layout title="Profile">
        <h1>Loading...</h1>;
      </Layout>
    );
  }

  return (
    <ErrorBoundary fallback={<h1>Could not fetch profile data</h1>}>
      <Layout title="Profile">
        <Row>
          <Col>
            <Card>
              <Card.Img
                variant="top"
                style={{ width: "200px" }}
                src={`https://robohash.org/${2}?set=set2&size=200x200`}
              />
              <Card.Body>
                <Card.Title>
                  {data.user.first_name || ""} {data.user.last_name || ""}
                </Card.Title>
                <Card.Text>{data.user.email} </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Layout>
    </ErrorBoundary>
  );
}

// export async function getStaticProps(ctx) {
//   let res = await axios.get("https://jsonplaceholder.typicode.com/posts");

//   let data = res.data.filter((b, i) => i < 6);

//   // if (!data) {
//   //   return {
//   //     redirect: {
//   //       destination: "/no-data",
//   //     },
//   //   };
//   // }

//   if (data.length === 0) {
//     return { notFound: true };
//   }

//   return {
//     props: { blogs: data },
//     revalidate: 10,
//   };
// }

export default connect((state) => state, actions)(Profile);
