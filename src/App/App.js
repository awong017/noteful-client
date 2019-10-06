import React, {Component} from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import ApiContext from '../ApiContext';
import config from '../config';
import uuid from 'uuid/v4';
import './App.css';

class App extends Component {

    state = {
        notes: [],
        folders: [],
        folderNameError: "",
        noteNameError: "",
        noteContentError: "",
        noteFolderError: "",
    };

    handleAddFolder = (event, folderName) => {
        event.preventDefault()

        if (!folderName) {
            this.setState({
                folderNameError: "Invalid folder name"
            })
        }
        else
        {
            this.setState({
                folderNameError: ""
            })

            const folder = {
                "id": uuid(),
                "name": folderName
            }

            this.setState((prevState) => {
                prevState.folders.push(folder)
            })

            const url = config.API_ENDPOINT + '/folders';
            const options ={
                method: 'POST',
                body: JSON.stringify(folder),
                headers: {
                    "Content-Type": "application/json"
                }
            };

            fetch(url, options)
                .then(res => {
                    if(!res.ok) {
                        throw new Error('Something went wrong, please try again later');
                    }
                    return res.json();
                })

            this.props.history.push('/');
        }
    }

    handleAddNote = (event, noteName, noteContent, noteFolder) => {
        event.preventDefault()
    
        if (!noteName) {
            this.setState({
                noteNameError: "Invalid note name"
            })
        }
    
        else if (!noteContent) {
            this.setState({
                noteContentError: "Missing content"
            })
        }
    
        else if (!noteFolder) {
            this.setState({
                noteFolderError: "Please select folder. If no folders are created, please create one"
            })
        }
    
        else
        {
            const note = {
                "id": uuid(),
                "name": noteName,
                "content": noteContent,
                "folderId": noteFolder,
                "modified": Date.now()
            }
    
            this.setState((prevState) => {
                prevState.notes.push(note)
            })

            const url = config.API_ENDPOINT + '/notes';
            const options ={
                method: 'POST',
                body: JSON.stringify(note),
                headers: {
                    "Content-Type": "application/json"
                }
            };

            fetch(url, options)
                .then(res => {
                    if(!res.ok) {
                        throw new Error('Something went wrong, please try again later');
                    }
                    return res.json();
                })

            this.props.history.push('/');
        }
    }

    handleAddButton = () => {
        this.setState({
            folderNameError: "",
            noteNameError: "",
            noteContentError: "",
            noteFolderError: ""
        })
    }
  
    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={NotePageNav} />
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            folderNameError: this.state.folderNameError,
            noteNameError: this.state.noteNameError,
            noteContentError: this.state.noteContentError,
            noteFolderError: this.state.noteFolderError,
            deleteNote: this.handleDeleteNote,
            addNote: this.handleAddNote,
            addFolder: this.handleAddFolder,
            addButton: this.handleAddButton
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default withRouter(App);
