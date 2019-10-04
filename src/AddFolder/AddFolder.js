import React from 'react'
import ApiContext from '../ApiContext';
import './AddFolder.css';

class AddFolder extends React.Component {
  static contextType = ApiContext;

  state = {
    error: null
  };

  updateName = (newName) => {
    this.setState({
      name: newName
    })
  }

  render() {
    const { addFolder, folderNameError } = this.context;

    return (
        <form onSubmit={(e) => addFolder(e, this.state.name)} className='add-folder'>
            <label>Folder Name: </label>
            <input type='text' name='folderName' id='folderName' className='folderName' onChange={e => this.updateName(e.target.value)}></input>
            <div className='error'>{folderNameError}</div>
            <input type='submit'/>
        </form>
    )
  }
}

export default AddFolder;

