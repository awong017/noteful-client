import React from 'react'

class FolderMenu extends React.Component {
  
  render() {
        return (
            <option value={this.props.id}>{this.props.name}</option>
        )
    }
}

export default FolderMenu;