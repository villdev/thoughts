import React, { useReducer } from "react";
import "./main.scss";
import Sidenavbar from "./components/Sidenavbar/Sidenavbar";
import NoteList from "./components/NoteList/NoteList";
import Note from "./components/Note/Note";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NoteReducer from "./reducer/NoteReducer";
import { NotesContext } from "./context/context";
import { Toaster } from "react-hot-toast";

const initialState = [];

function App() {
  const [notes, notesDispatch] = useReducer(NoteReducer, initialState);

  return (
    <Router>
      <NotesContext.Provider value={{ notesState: notes, notesDispatch }}>
        <div className="EvernoteClone">
          <Sidenavbar />
          <Switch>
            <Route path="/all-notes">
              <NoteList title="All Notes" />
              <Route path="/all-notes/:id">
                <Note />
              </Route>
            </Route>
            <Route path="/trash">
              <NoteList title="Trash" />
              <Route path="/trash/:id">
                <Note />
              </Route>
            </Route>
            <Redirect
              to={{
                pathname: "/all-notes",
              }}
            />
          </Switch>
        </div>
        <Toaster position="bottom-right" />
      </NotesContext.Provider>
    </Router>
  );
}

export default App;
