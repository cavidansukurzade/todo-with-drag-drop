/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./style.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../redux/reset";
import { LoginRequest } from "../../redux/actions/authAction";
import { setInputs } from "../../redux/reducers/authSlice";
import SimpleBackdrop from "../../components/loader";

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
        <h4>Login:cavidan<br/>Password:123</h4>
        <input
          name="userName"
          type="text"
          placeholder="User name"
          value={inputs.userName}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button type="submit">submit</button>
        {loading && (
          <span>
            <SimpleBackdrop loading={true} />
          </span>
        )}
      </form>
    </section>
  );
};

export default Login;
