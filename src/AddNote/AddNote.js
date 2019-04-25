import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
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
      validationMessage: null
    }
  }

  handleNameChange = name => {
    this.setState({noteName: name}, this.validateName())
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
    console.log(this.props)
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
          folder: results.folder
        }
        this.context.handleAdd(newNote)
      })
      .then(this.props.history.goBack())
      .catch(err => console.error(err))
  }

  validateName = () => {
    if (!this.state.noteName.length) {
      this.setState({
        validationMessage:'The note field must not be left blank.'
      })
    } 
  }

  render() {
    const { folders } = this.context;
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm formSubmit={this.handleFormSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
            {this.state.validationMessage}
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
            <button type='submit'>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
