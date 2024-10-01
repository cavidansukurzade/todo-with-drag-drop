import { IoIosSearch } from "react-icons/io";
import CustomButton from "../../components/custom-button";
import CustomInput from "../../components/custom-input";
import { useState } from "react";
import Modal from "../../components/modal";
import CustomSelect from "../../components/custom-select";
import CustomTable from "../../components/custom-table";
import CustomDateInput from "../../components/custom-date-input";
import { useDispatch, useSelector } from "react-redux";
import { setInputs } from "../../redux/reducers/homeSlice";
import CustomMenu from "../../components/custom-menu";
import Pagination from "../../components/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  Pagination as SliderPagination,
  Navigation,
} from "swiper/modules";
const Components = () => {
  const dispatch = useDispatch();
  const { inputs } = useSelector((store) => store.home);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newInputs = {
      ...inputs,
      [name]: value,
    };
    dispatch(setInputs(newInputs));
  };
  const options = [
    { name: "Agshin", value: 1 },
    { name: "Cavidan", value: 2 },
  ];
  const optionsMultiple = [
    { name: "Agshin", value: 1, age: 3 },
    { name: "Cavidan", value: 2 },
    { name: "Mustafa", value: 3 },
    { name: "Kamran", value: 11 },
    { name: "Vefa", value: 22 },
    { name: "Zahid", value: 33 },
  ];
  const columns = [
    {
      name: "Kod",
      value: "id",
      width: "40px",
    },
    {
      name: "Ad",
      value: "name",
    },
    {
      name: "Yaş",
      value: "age",
    },
    {
      name: "Yaşayış yeri",
      value: "occupation",
      onChange: function (e, item, index) {
        const newItems = data.map((item, itemIndex) =>
          itemIndex === index ? { ...item, [this.value]: e.target.value } : item
        );
        setData(newItems);
      },
    },
    {
      name: "Şəhər",
      value: "city",
    },
  ];
  const [data, setData] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 28,
      occupation: "Engineer",
      city: "New York",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 34,
      occupation: "Designer",
      city: "Los Angeles",
    },
    {
      id: 3,
      name: "Sam Green",
      age: 23,
      occupation: "Developer",
      city: "Chicago",
    },
    {
      id: 4,
      name: "Alice Brown",
      age: 29,
      occupation: "Manager",
      city: "San Francisco",
    },
    {
      id: 5,
      name: "Michael Johnson",
      age: 31,
      occupation: "Architect",
      city: "Miami",
    },
    {
      id: 6,
      name: "Patricia Williams",
      age: 27,
      occupation: "Doctor",
      city: "Seattle",
    },
    {
      id: 7,
      name: "Robert Jones",
      age: 40,
      occupation: "Lawyer",
      city: "Boston",
    },
    {
      id: 8,
      name: "Linda Davis",
      age: 36,
      occupation: "Chef",
      city: "Houston",
    },
    {
      id: 9,
      name: "James Wilson",
      age: 45,
      occupation: "Pilot",
      city: "Phoenix",
    },
    {
      id: 10,
      name: "Barbara Martinez",
      age: 32,
      occupation: "Teacher",
      city: "Dallas",
    },
  ]);
  const menuItems = [
    { name: "Item-1", onClick: () => console.log(1) },
    { name: "Item-2", onClick: () => console.log(2) },
  ];
  const selectAll = () => {
    function areAllValuesPresent(numbersArray, objectsArray) {
      const objectValues = objectsArray.map((obj) => obj.value);
      return objectValues.every((value) =>
        numbersArray.some((num) => num === value)
      );
    }
    if (areAllValuesPresent(inputs.users, optionsMultiple)) {
      const newInputs = {
        ...inputs,
        users: [],
      };
      dispatch(setInputs(newInputs));
    } else {
      const newUsers = optionsMultiple.map((item) => item.value);
      const newInputs = {
        ...inputs,
        users: newUsers,
      };
      dispatch(setInputs(newInputs));
    }
  };
  const [modal, setModal] = useState(false);

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    display: "none",
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        gap: "32px",
        justifyContent: "center",
        paddingTop: "40px",
        flexWrap: "wrap",
      }}
    >
      <CustomMenu
        menuPosition={menuPosition}
        setMenuPosition={setMenuPosition}
        items={menuItems}
      />
      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <CustomButton variant="success" onClick={() => setModal(true)}>
          Succes button
        </CustomButton>
        <CustomButton variant="error">Error button</CustomButton>
        <CustomButton variant="info">Info button</CustomButton>
        <CustomButton variant="success-contained">Succes button</CustomButton>
        <CustomButton variant="error-contained">Error button</CustomButton>
        <CustomButton variant="info-contained">Info button</CustomButton>
        <CustomButton disabled>Disabled button</CustomButton>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <CustomInput
          name="firstName"
          endIcon={<IoIosSearch />}
          onChange={handleChange}
          value={inputs.firstName}
          focusStyle={{ border: "1px solid red" }}
        />
        <CustomInput
          label="Surname"
          name="surName"
          errorMessage={"Error message"}
          onChange={handleChange}
          value={inputs.surName}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <CustomSelect
          value={inputs.user}
          onChange={handleChange}
          name="user"
          width="300px"
          options={options}
          errorMessage={""}
          disabled
        />
        <CustomSelect
          label="Multiple with label"
          value={inputs.users}
          selectAll={selectAll}
          onChange={handleChange}
          name="users"
          width="200px"
          options={optionsMultiple}
          multiple
          optionContainerHeight="240px"
          optionHeight="40px"
        />
      </div>
      <Modal
        open={modal}
        handleClose={() => setModal(false)}
        name={"Modal name"}
        fullScreen={true}
        headerChildren={
          <CustomButton variant="info-contained" height="40px">
            Header Button
          </CustomButton>
        }
        footerChildren={
          <CustomButton variant="info-contained" height="40px">
            Footer Button
          </CustomButton>
        }
      >
        {
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            Children elements
          </h1>
        }
      </Modal>
      <CustomDateInput
        onChange={handleChange}
        name="date"
        value={inputs.date}
        label="Start date"
        disabled
      />
      <div>
        <CustomTable
          headerBackground="var(--blue-500)"
          headerColor="white"
          width="600px"
          // height="300px"
          columns={columns}
          data={data.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )}
          onDoubleClick={(e, item, index) => {
            e.preventDefault();
            console.log(item, index);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            setMenuPosition({
              top: mouseY,
              left: mouseX,
              display: "block",
            });
          }}
          // margin="0 0 24px 0 "
        />
        <Pagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      <Swiper
        slidesPerView={2}
        spaceBetween={0}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, SliderPagination, Navigation]}
        style={{ width: "50%", height: "160px", backgroundColor: "aliceblue" }}
      >
        <SwiperSlide style={{ background: "red" }}></SwiperSlide>
        <SwiperSlide style={{ background: "orange" }}></SwiperSlide>
        <SwiperSlide style={{ background: "green" }}></SwiperSlide>
        <SwiperSlide style={{ background: "yellow" }}></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Components;
