import { useMutation, useQuery } from "react-query";

const ReactQuery = () => {
  const {
    data: allData,
    isLoading: allDataLoading,
    refetch: refetchAllData,
  } = useQuery(
    ["posts"],
    () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
    { enabled: false }
  );
  const {
    data: createdData,
    mutate: createData,
    reset: resetCreatedData,
    isLoading: createLoading,
  } = useMutation(
    ["users"],
    (newUser) =>
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(newUser),
      }).then((res) => res.json()),
    { enabled: false }
  );
  console.log("createdData", createdData);
  return (
    <div className="container">
      <button style={{ width: "100px" }} onClick={() => refetchAllData()}>
        Fetch data
      </button>
      <button
        style={{ width: "100px" }}
        onClick={() => createData({ title: "javidan" })}
      >
        Create data
      </button>
      <button style={{ width: "140px" }} onClick={() => resetCreatedData()}>
        Reset created data
      </button>
      <div>
        {allDataLoading
          ? "loading..."
          : allData
          ? allData
              .slice(0, 10)
              .map((item, index) => <p key={index}>{item.title}</p>)
          : "No fetch"}
      </div>
      <div style={{ height: "1200px" }}>
        {createLoading ? (
          "loading..."
        ) : createdData ? (
          <p>{createdData.title}</p>
        ) : (
          "No creation"
        )}
      </div>
    </div>
  );
};

export default ReactQuery;
