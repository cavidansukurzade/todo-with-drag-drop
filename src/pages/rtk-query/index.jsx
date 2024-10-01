import {
  useGetPostAllPostsQuery,
  // useGetPostByIdQuery,
  // useCreatePostMutation,
  // useUpdatePostMutation,
  // useDeletePostMutation,
} from "../../redux/services/jsonPlaceholder";

const RtkQuery = () => {
  const {
    data: allData,
    isError: allDataError,
    isLoading: allDataLoading,
  } = useGetPostAllPostsQuery();
  console.log("allData", allData, allDataError, allDataLoading);

  // const {
  //   data: dataById,
  //   isError: dataByIdError,
  //   isLoading: dataByIdLoading,
  // } = useGetPostByIdQuery(1);
  // console.log("dataById", dataById, dataByIdError, dataByIdLoading);

  // const [
  //   createPost,
  //   {
  //     data: createdData,
  //     isLoading: createLoading,
  //     isError: createIsError,
  //     isSuccess: createSuccess,
  //   },
  // ] = useCreatePostMutation();
  // console.log(
  //   "createData",
  //   createdData,
  //   createSuccess,
  //   createIsError,
  //   createLoading
  // );

  // const handleSubmit = async () => {
  //   const newPost = { title: "new title" };
  //   try {
  //     const response = await createPost(newPost).unwrap();
  //     console.log("response", JSON.stringify(response));
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const [
  //   updatePost,
  //   {
  //     data: updatedData,
  //     isLoading: updateLoading,
  //     isError: updateIsError,
  //     isSuccess: updateSuccess,
  //   },
  // ] = useUpdatePostMutation();
  // console.log(
  //   "updateData",
  //   updatedData,
  //   updateSuccess,
  //   updateIsError,
  //   updateLoading
  // );

  // const handleUpdate = async () => {
  //   const id = 1;
  //   const data = { title: "new title" };
  //   try {
  //     const response = await updatePost({ id, data }).unwrap();
  //     console.log("response", JSON.stringify(response));
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const [
  //   deletePost,
  //   {
  //     data: deletedData,
  //     isLoading: deleteLoading,
  //     isError: deleteIsError,
  //     isSuccess: deleteSuccess,
  //   },
  // ] = useDeletePostMutation();
  // console.log(
  //   "deleteData",
  //   deletedData,
  //   deleteSuccess,
  //   deleteIsError,
  //   deleteLoading
  // );

  // const handleDelete = async () => {
  //   const id = 1;
  //   try {
  //     const response = await deletePost(id).unwrap();
  //     console.log("response", JSON.stringify(response));
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  return (
    <div className="container">
      {allData && "data fetched"}
      {allDataError && "error occured"}
      {allDataLoading && "loading..."}

      {/* <button onClick={handleSubmit} disabled={createLoading}>
        Create Post
      </button>
      <button onClick={handleUpdate} disabled={updateLoading}>
        Update Post
      </button>
      <button onClick={handleDelete} disabled={deleteLoading}>
        Delete Post
      </button> */}
    </div>
  );
};

export default RtkQuery;
