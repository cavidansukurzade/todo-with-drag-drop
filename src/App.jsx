/* eslint-disable react-hooks/exhaustive-deps */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainRoutes from "./routes/MainRoutes";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { CheckAuth } from "./redux/actions/authAction";
import SimpleBackdrop from "./components/loader";
function App() {
  const [pageLoading, setPageLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CheckAuth()).finally(() => {
      setPageLoading(false);
    });
  }, []);
  return (
    <>
      {pageLoading ? (
        <SimpleBackdrop background="white" loading={true} />
      ) : (
        <MainRoutes />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
