import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const accessToken = localStorage.getItem("token");

      if (!accessToken) {
        Router.replace("/");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
