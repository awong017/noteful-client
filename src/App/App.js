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
import './App.css';

class App extends Component {

    state = {
        notes: [],
        folders: [],
        idNoteCount: 1,
        idFolderCount: 1,
        folderNameError: "",
        noteNameError: "",
        noteContentError: "",
        noteFolderError: "",
    };

    handleAddFolder = (event, folderName) => {
        event.preventDefault()

        for(let i=0; i<this.state.folders.length; i++){
            if (folderName = this.state.folders[i].name) {
                this.setState({
                    folderNameError: "Folder name already exists"
                })
            }
        } 

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
                id: this.state.idFolderCount,
                name: folderName
            }

            this.setState((prevState) => {
                prevState.folders.push(folder)
            })

            this.setState((prevState) => {
                return {idFolderCount: prevState.idFolderCount + 1};
            })
            this.props.history.push('/');
        }
    }

  handleAddNote = (event, noteName, noteContent, noteFolder) => {
    event.preventDefault()

    if (!noteName.current.value) {
        this.setState({
            noteNameError: "Invalid note name"
        })
    }

    else if (!noteContent.current.value) {
        this.setState({
            noteContentError: "Missing content"
        })
    }

    else if (!noteFolder.current.value) {
        this.setState({
            noteFolderError: "Please create folder"
        })
    }

    else
    {
        const note = {
            id: this.state.idNoteCount,
            name: noteName.current.value,
            content: noteContent.current.value,
            folderId: noteFolder.current.value,
            modified: Date.now()
        }

        this.setState((prevState) => {
            prevState.notes.push(note)
        })

        this.setState((prevState) => {
            return {idNoteCount: prevState.idNoteCount + 1};
        })
        this.props.history.push('/');
    }
}

    handleAddButton = () => {
        this.setState({
            folderNameError: "",
            noteNameError: "",
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
                        render={props => <NoteListNav {...props} handleAddButton={this.handleAddButton} notes={this.state.notes} />}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route 
                    path="/add-folder"
                    render={props => <AddFolder {...props} 
                        handleAddFolder={this.handleAddFolder} 
                        folderNameError={this.state.folderNameError} />}
                    />
                <Route path="/add-note" component={NotePageNav} />
                <Route 
                    path="/add-note"
                    render={props => <AddNote {...props} 
                        handleAddNote={this.handleAddNote} 
                        noteNameError={this.state.noteNameError}
                        noteContentError={this.state.noteContentError}
                        noteFolderError={this.state.noteFolderError}
                        folders={this.state.folders}
                    />}
                 />
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
                        render = {props => <NoteListMain {...props} handleAddButton={this.handleAddButton} />}
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
            deleteNote: this.handleDeleteNote
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
