import React from 'react'
import ApiContext from '../ApiContext';
import './AddFolder.css';

class AddFolder extends React.Component {
  static contextType = ApiContext;

  state = {
    error: null,
  };

  updateName = (newName) => {
    this.setState({
      name: newName
    })
  }

  render() {
    return (
        <form className='add-folder'>
            <label>Folder Name: </label>
            <input type='text' name='folderName' id='folderName' onChange={e => this.updateName(e.target.value)}></input>
            <button onClick={(e) => this.props.handleAddFolder(e, this.state.name)}>Add</button>
        </form>
    )
  }
}

export default AddFolder;

