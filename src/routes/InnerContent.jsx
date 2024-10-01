import { Outlet } from "react-router";
const InnerContent = () => {
  return (
    <main id="inner-content">
      <Outlet />
    </main>
  );
};

export default InnerContent;
