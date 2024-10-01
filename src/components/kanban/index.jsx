import styles from "./style.module.scss";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue, setTasks } from "../../redux/reducers/homeSlice";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { setAuth } from "../../redux/reducers/authSlice";

const Kanban = () => {
  const { tasks, inputValue } = useSelector((store) => store.home);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = tasks.map((section) => {
      if (section.title === " 📃 To do") {
        return {
          ...section,
          tasks: [
            ...section.tasks,
            {
              id: uuidv4(),
              title: inputValue,
            },
          ],
        };
      }
      return section;
    });

    dispatch(setTasks(updatedData));
    dispatch(setInputValue(""));
  };

  const handleDeleteItem = (taskId) => {
    const updatedData = tasks.map((section) => {
      return {
        ...section,
        tasks: section.tasks.filter((task) => task.id !== taskId),
      };
    });

    dispatch(setTasks(updatedData));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceColIndex = tasks.findIndex((e) => e.id === source.droppableId);
    const sourceCol = tasks[sourceColIndex];
    const sourceTasks = [...sourceCol.tasks];

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const [removed] = sourceTasks.splice(source.index, 1);
      sourceTasks.splice(destination.index, 0, removed);

      const updatedData = [...tasks];
      updatedData[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
      dispatch(setTasks(updatedData));
    } else {
      // Moving between different columns
      const destinationColIndex = tasks.findIndex(
        (e) => e.id === destination.droppableId
      );
      const destinationCol = tasks[destinationColIndex];
      const destinationTasks = [...destinationCol.tasks];

      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);

      const updatedData = [...tasks];
      updatedData[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
      updatedData[destinationColIndex] = {
        ...destinationCol,
        tasks: destinationTasks,
      };
      dispatch(setTasks(updatedData));
    }
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
          <input
            style={{
              width: "200px",
              height: "40px",
              padding: "0 12px",
              borderRadius: "4px",
              border: "1px solid gray",
            }}
            placeholder="New task"
            type="text"
            value={inputValue}
            onChange={(e) => dispatch(setInputValue(e.target.value))}
          />
        </form>
        <button
          style={{
            height: "40px",
            padding: "0 12px",
          }}
          onClick={() => dispatch(setAuth(false))}
        >
          Log Out
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.kanban}>
          {tasks.map((section) => (
            <div key={section.id}>
              <Droppable droppableId={section.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    className={styles.section}
                    ref={provided.innerRef}
                  >
                    <div className={styles.title}>{section.title}</div>
                    <div className={styles.content}>
                      {section.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              onDoubleClick={() => console.log(task.title)}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? "0.5" : "1",
                              }}
                            >
                              <div className={styles.card}>
                                <span>{task.title}</span>
                                <span onClick={() => handleDeleteItem(task.id)}>
                                  <MdDelete />
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default Kanban;
