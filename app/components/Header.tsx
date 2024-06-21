import { Link } from "@remix-run/react";

export const Header = () => {
  return (
    <nav style={{ margin: "2rem" }}>
      <Link to="/">
        <h1>
          <b>Inventory Management</b>
        </h1>
      </Link>
    </nav>
  );
};
