import React from 'react'
import { Link } from 'react-router-dom'
import './AddNote.css'

class AddNote extends React.Component {

  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.folderInput = React.createRef();
  }

  validateFolder = (event, folder) => {
    event.preventDefault();

    if(typeof folder !== 'number') {
      return "Folder must be a number";
    }
  }

  render() {
    return (
        <form className='add-note'>
            <label>Note Name: </label>
            <input type='text' className='text' ref={this.nameInput}></input>
            <label>Folder: </label>
            <input type='text' className='text' ref={this.folderInput}></input>
            <button onClick={(e) => this.props.handleAddNote(e, this.nameInput, this.folderInput)}
            >
              Add
            </button>
        </form>
    )
  }
}

export default AddNote;