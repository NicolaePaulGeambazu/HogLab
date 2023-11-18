import React from "react";
import { ErrorPage } from "./Page404.styles";

const Page404: React.FC = () => {
  return (
    <ErrorPage>
      <h1>Oops! 404</h1>
      <p>Page not found</p>
    </ErrorPage>
  );
};

export default Page404;