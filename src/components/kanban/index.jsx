import "./style.scss";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import mockData from "../../mockData";
import { useState } from "react";
import Card from "../card";
import { v4 as uuidv4 } from "uuid";
import { MdDelete } from "react-icons/md";

const Kanban = () => {
  const [data, setData] = useState(mockData);
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = data.map((section) => {
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

    setData(updatedData);
    setInputValue("");
  };

  const handleDeleteItem = (taskId) => {
    console.log(taskId);
    const updatedData = data.map((section) => {
      return {
        ...section,
        tasks: section.tasks.filter((task) => task.id !== taskId),
      };
    });

    setData(updatedData);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    const sourceCol = data[sourceColIndex];
    const sourceTasks = [...sourceCol.tasks];

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const [removed] = sourceTasks.splice(source.index, 1);
      sourceTasks.splice(destination.index, 0, removed);

      const updatedData = [...data];
      updatedData[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
      setData(updatedData);
    } else {
      // Moving between different columns
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );
      const destinationCol = data[destinationColIndex];
      const destinationTasks = [...destinationCol.tasks];

      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);

      const updatedData = [...data];
      updatedData[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
      updatedData[destinationColIndex] = {
        ...destinationCol,
        tasks: destinationTasks,
      };
      setData(updatedData);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban">
          {data.map((section) => (
            <div key={section.id}>
              <Droppable droppableId={section.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    className="kanban__section"
                    ref={provided.innerRef}
                  >
                    <div className="kanban__section__title">
                      {section.title}
                    </div>
                    <div className="kanban__section__content">
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
                              <Card>
                                <span>{task.title}</span>
                                <span onClick={() => handleDeleteItem(task.id)}>
                                  <MdDelete />
                                </span>
                              </Card>
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
