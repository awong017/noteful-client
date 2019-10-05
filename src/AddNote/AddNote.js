import React from 'react'
import FolderMenu from '../FolderMenu/FolderMenu';
import ApiContext from '../ApiContext';
import './AddNote.css'

class AddNote extends React.Component {
  static contextType = ApiContext;

  state = {
    error: null
  };

  updateName = (name, content, folder) => {
    this.setState({
      name: name,
      content: content,
      folder: folder
    })
  }

  render() {

    const { addNote, noteNameError, noteContentError, noteFolderError, folders } = this.context;
    const { name, content, folder } = this.state;

    return (
        <form onSubmit={(e) => addNote(e, name, content, folder)} className='add-note'>

            <label>Note Name: </label>
            <input type='text' className='text' onChange={e => this.updateName(e.target.value, content, folder )}></input>
            <div className='error'>{noteNameError}</div>

            <label>Content:</label>
            <textarea className='content' onChange={e => this.updateName(name, e.target.value, folder)}></textarea>
            <div className='error'>{noteContentError}</div>

            <label>Folder: </label>
            <select onChange={e => this.updateName(name, content, e.target.value)}>
              <option disabled selected value> -- select a folder --</option>
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