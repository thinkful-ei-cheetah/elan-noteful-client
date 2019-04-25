import React, { Component } from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import Error from '../Error'
import './AddNote.css';
import NoteContext from '../NoteContext';

export default class AddNote extends Component {
  static defaultProps = {
    folders: [],
  }

  static contextType = NoteContext;

  constructor(props) {
    super(props);
    this.state = {
      noteName: '',
      noteContent: '',
      noteFolder: '',
      noteValid: false,
      validationMessage: '',
      error: null
    }
  }

  handleNameChange = name => {
    this.setState({noteName: name}, () => {this.validateName(name)})
  }

  handleContentChange = content => {
    this.setState({noteContent: content})
  }

  handleFolderChange = folder => {
    this.setState({noteFolder: folder})
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        name: this.state.noteName,
        content: this.state.noteContent,
        folder: this.state.noteFolder
      })
    }
    fetch('http://localhost:9090/notes/', options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong. Please refresh the page.')
        }
        return res;
      })
      .then(data => data.json())
      .then(results => {
        const newNote = {
          name: results.name,
          content: results.content,
          folderId: results.folder,
          id: results.id
        }
        this.context.handleAdd(newNote)
      })
      .then(this.props.history.goBack())
      .catch(err => this.setState({error: err}))
  }


  validateName = (name) => {
    if (name.length === 0) {
      this.setState({
        validationMessage:'The note field must not be left blank.',
        noteValid: false
      })
    } else {
      this.setState({
        validationMessage: null,
        noteValid: true
      })
    }
  }   

  render() {
    const { folders } = this.context;
    return (
      <Error>
      <section className='AddNote'>
        <h2>Create a note</h2>
        {this.state.error}
        <NotefulForm formSubmit={this.handleFormSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
            {this.state.validationMessage} <br />
              Name
            </label>
            <input 
              type='text' 
              id='note-name-input' 
              onChange={e => this.handleNameChange(e.target.value)}/>
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea 
              id='note-content-input' 
              onChange={e => this.handleContentChange(e.target.value)}/>
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select 
              id='note-folder-select'
              onChange={e => this.handleFolderChange(e.target.value)}>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button
              disabled={!this.state.noteValid}
              type='submit'>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
      </Error>
    )
  }
}

AddNote.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func
  })
}