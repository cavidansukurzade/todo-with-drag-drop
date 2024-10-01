import { Outlet } from "react-router";
const InnerContent = () => {
  return (
    <div id="inner-content">
      <Outlet />
    </div>
  );
};

export default InnerContent;
