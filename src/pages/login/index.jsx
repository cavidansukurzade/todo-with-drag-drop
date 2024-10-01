/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./style.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../redux/reset";
import { LoginRequest } from "../../redux/actions/authAction";
import { setInputs } from "../../redux/reducers/authSlice";

const Login = () => {
  const { inputs, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.clear();
    dispatch(resetState());
  }, []);
  const loginRequest = () => {
    dispatch(
      LoginRequest({
        userName: inputs.userName,
        password: inputs.password,
      })
    );
    return;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setInputs({ ...inputs, [name]: value }));
    return;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loginRequest();
  };
  return (
    <section className={styles.main} onSubmit={handleSubmit}>
      <form>
        <input type="text" value={inputs.userName} onChange={handleChange} />
        <input
          type="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button type="submit">submit</button>
        {loading && <span>loading...</span>}
      </form>
    </section>
  );
};

export default Login;
