/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { setPassword, setEmail } from "../../redux/reducers/authSlice";
import { useEffect, useState } from "react";
import { LoginRequest } from "../../redux/actions/authAction";
import { resetAllStates } from "../../redux/reset";
import CustomButton from "./../../components/custom-button/index";
import { FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa";
import styles from "./style.module.scss";
import SimpleBackdrop from "../../components/loader";
import CustomInput from "../../components/custom-input";
const Login = () => {
  const { loginInputs, errorInputs, loading } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const loginRequest = () => {
    dispatch(
      LoginRequest({
        email: loginInputs.email,
        password: loginInputs.password,
      })
    );
    return;
  };
  useEffect(() => {
    localStorage.clear();
    dispatch(resetAllStates());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginRequest();
  };
  const [typePassword, setTypePassword] = useState(true);

  return (
    <>
      <div className={styles["form-div"]}>
        <form action="" onSubmit={handleSubmit}>
          <h1>Daxil ol</h1>
          <CustomInput
            placeholder="İstifadəçi"
            value={loginInputs.email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            isError={errorInputs.email}
            required
            height="40px"
            startIcon={<FaUser />}
            iconColor="var(--grey-500)"
            className={styles["login-input"]}
            focusBorder="1px solid var(--blue-500)"
          />
          <CustomInput
            type={typePassword ? "password" : "text"}
            placeholder="Şifrə"
            value={loginInputs.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            isError={errorInputs.password}
            errorMessage=""
            required
            height="40px"
            startIcon={<FaKey />}
            endIcon={typePassword ? <FaEyeSlash /> : <FaEye />}
            iconColor="var(--grey-500)"
            iconCursor="pointer"
            className={styles["login-input"]}
            iconClick={() => setTypePassword(!typePassword)}
            endIconGap="8px"
            focusBorder="1px solid var(--blue-500)"
          />
          <CustomButton
            variant="info-contained"
            type="submit"
            className={styles["submit-button"]}
            shadow={false}
            height="40px"
            fontSize="16px"
          >
            Daxil ol
          </CustomButton>
        </form>
      </div>
      <SimpleBackdrop loading={loading} />
    </>
  );
};

export default Login;
