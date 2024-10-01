import { useDispatch } from "react-redux";

import { GetAllPosts } from "../../redux/actions/homeAction";
import {
  // Bounce,
  // Fade,
  // Flip,
  // Hinge,
  // JackInTheBox,
  // Roll,
  // Rotate,
  // Slide,
  Zoom,
} from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";


const Home = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    console.log(i18n);
  };
  useEffect(() => {
    console.log(i18n);
  }, [i18n]);
  return (
    <div className="container">
      <p onClick={() => dispatch(GetAllPosts())}>This is Home Page</p>
      <Zoom triggerOnce>
        <p>{t("Welcome message")}</p>
      </Zoom>
      <button style={{ width: "100px" }} onClick={() => changeLanguage("en")}>
        Eng
      </button>
      <button style={{ width: "100px" }} onClick={() => changeLanguage("az")}>
        Aze
      </button>
    
    </div>
  );
};

export default Home;
