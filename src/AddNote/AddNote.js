import React from 'react'
import FolderMenu from '../FolderMenu/FolderMenu';
import ApiContext from '../ApiContext';
import './AddNote.css'

class AddNote extends React.Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    
    this.nameInput = React.createRef();
    this.contentInput = React.createRef();
    this.folderInput = React.createRef();
  }

  render() {

    const { addNote, noteNameError, noteContentError, noteFolderError, folders } = this.context;

    return (
        <form onSubmit={(e) => addNote(e, this.nameInput, this.contentInput, this.folderInput)} className='add-note'>

            <label>Note Name: </label>
            <input type='text' className='text' ref={this.nameInput}></input>
            <div className='error'>{noteNameError}</div>

            <label>Content:</label>
            <textarea className='content' ref={this.contentInput}></textarea>
            <div className='error'>{noteContentError}</div>

            <label>Folder: </label>
            <select ref={this.folderInput}>
              {folders.map(folder =>
                <FolderMenu
                  name={folder.name}
                  id={folder.id}
                />
              )}
            </select>
            <div className='error'>{noteFolderError}</div>
            <input type='submit'/>
        </form>
    )
  }
}

export default AddNote;