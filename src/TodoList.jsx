import React from "react";
import { useState, useEffect, useMemo, useReducer, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import TodoListLogic from "./Reducer/TodoListLogic";
import { ToastContext } from "./Context/ToastContext";

// Mateial Component
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ButtonGroup from "@mui/material/ButtonGroup";
import Dialog from "@mui/material/Dialog";
import CardActions from "@mui/material/CardActions";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const todoContent = [
  {
    id: uuidv4(),
    title: "hello world ggfhhdk 1",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "hello world ggfhhdk 2",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "hello world ggfhhdk 3",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "hello world ggfhhdk 4",
    isCompleted: false,
  },
];

function App() {
  // the toast here ==> showHideToast function that i get it the app.js component
  const toast = useContext(ToastContext);

  const [todos, dispatch] = useReducer(TodoListLogic, todoContent);
  // const [todos, setTodos] = useState(todoContent);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTodoIdDelete, setSelectedTodoIdDelete] = useState(null);
  const [todosType, setTodosType] = useState("all");

  // completed todo

  const completed = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  // not completed todo

  const notCompleted = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let allTodos = todos;

  if (todosType == "completed") {
    allTodos = completed;
  } else if (todosType == "notCompleted") {
    allTodos = notCompleted;
  } else {
    allTodos = todos;
  }

  useEffect(() => {
    dispatch({type: "get"});
  }, []);

  const todolist = allTodos.map((todo) => {
    return (
      <ListItem divider key={todo.id}>
        <button
          onClick={() => {
            handelCheckClicked(todo.id);
          }}
          style={{
            cursor: "pointer",
            border: "1px solid green",
            borderRadius: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "35px",
            width: "35px",
            marginRight: "20px",
            background: todo.isCompleted ? "green" : "white",
          }}
        >
          <CheckCircleOutlineOutlinedIcon
            sx={{ color: todo.isCompleted ? "white" : "green" }}
            variant="outlined"
          />
        </button>
        <p style={{ fontSize: "18px" }}>{todo.title}</p>
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              hadelDeleteClicked(todo.id);
            }}
            edge="end"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });

  function displyType(e) {
    const value = e.target.value;
    setTodosType(value);
    localStorage.setItem("todos", JSON.stringify(value));
  }

  // check if checkbox is completed on not
  function handelCheckClicked(id) {
    const chleckedId = id;
    dispatch({ type: "taggelCompleted", payload: { id: chleckedId } });
    toast("Updated Todo Is Successfuly");
  }

  // delete button
  function hadelDeleteClicked(id) {
    setOpen(true);
    setSelectedTodoIdDelete(id);
  }

  // close modal of delete button
  function closeModalDeleteButton() {
    setOpen(false);
  }

  // delete button
  function handelDeleteConfirm() {
    dispatch({ type: "delete", payload: { id: selectedTodoIdDelete } });
    setOpen(false);
    toast("Deleted Todo Is Successfuly");
  }

  // add new task button
  function handelClickedBttn() {
    dispatch({
      type: "added",
      payload: { id: todos.id, inputValue: inputValue },
    });
    setInputValue("");
    toast("New Todo Is Successfuly");
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5} style={{ marginTop: "70px" }}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ letterSpacing: "10px" }}
          >
            TODO
          </Typography>

          {/* Input and Add Button */}
          <Box display="flex" gap={2} mb={3}>
            <TextField
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              label="Add a task"
              variant="outlined"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<TaskAltIcon />}
              onClick={handelClickedBttn}
              disabled={inputValue.length === 0}
            >
              Add
            </Button>
          </Box>

          {/* Delete Modal */}
          <Dialog open={open} onClose={closeModalDeleteButton}>
            <React.Fragment>
              <Typography
                variant="h3"
                sx={{ padding: "20px 18px", fontSize: "30px" }}
                gutterBottom
              >
                Are you sure to delete this todo?
              </Typography>

              <CardActions sx={{ display: "flex", justifyContent: "end" }}>
                <Button
                  size="small"
                  onClick={() => {
                    closeModalDeleteButton();
                  }}
                >
                  close
                </Button>
                <Button
                  size="small"
                  sx={{ background: "red", color: "white" }}
                  onClick={() => {
                    handelDeleteConfirm();
                  }}
                >
                  delete
                </Button>
              </CardActions>
            </React.Fragment>
          </Dialog>
          {/* Delete Modal */}

          {/* To-Do Items */}
          <List className="todolist">
            {/* Static Example Items */}
            {todolist}
          </List>
          <ButtonGroup
            variant="outlined"
            value={todosType}
            onClick={displyType}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
            }}
          >
            <Button
              value="all"
              variant="text"
              aria-label="left aligned"
              sx={{ color: "black" }}
            >
              All
            </Button>
            <Button
              value="completed"
              aria-label="centered"
              variant="text"
              sx={{ color: "black" }}
            >
              Completed
            </Button>
            <Button
              value="notCompleted"
              aria-label="right aligned"
              variant="text"
              sx={{ color: "black" }}
            >
              Not Completed
            </Button>
          </ButtonGroup>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
