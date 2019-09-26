import React from 'react'
import { Link } from 'react-router-dom'
import FolderMenu from '../FolderMenu/FolderMenu';
import './AddNote.css'

class AddNote extends React.Component {

  constructor(props) {
    super(props);
    
    this.nameInput = React.createRef();
    this.contentInput = React.createRef();
    this.folderInput = React.createRef();
  }

  render() {
    return (
        <form className='add-note'>

            <label>Note Name: </label>
            <input type='text' className='text' ref={this.nameInput}></input>
            <div className='error'>{this.props.noteNameError}</div>

            <label>Content:</label>
            <textarea className='content' ref={this.contentInput}></textarea>
            <div className='error'>{this.props.noteContentError}</div>

            <label>Folder: </label>
            <select ref={this.folderInput}>
              {this.props.folders.map(folder =>
                <FolderMenu
                  name={folder.name}
                  id={folder.id}
                />
              )}
            </select>
            <div className='error'>{this.props.noteFolderError}</div>
            <button onClick={(e) => this.props.handleAddNote(e, this.nameInput, this.contentInput, this.folderInput)}
            >
              Add Note
            </button>
        </form>
    )
  }
}

export default AddNote;