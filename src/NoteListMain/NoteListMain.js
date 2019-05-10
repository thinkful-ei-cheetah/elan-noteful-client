import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import NoteContext from '../NoteContext';
import { getNotesForFolder } from '../notes-helpers'

export default class NoteListMain extends Component {
  static contextType = NoteContext;
  render() {  
    const { folderId } = this.props.match.params;
  return (
      <section className='NoteListMain'>
        <ul>
          {getNotesForFolder(this.context.notes, parseFloat(folderId)).map(note =>
            <li key={note.id}>
              <Note
                handleDelete={this.context.handleDelete}
                id={note.id}
                name={note.name}
                modified={note.modified}
                folder_id={note.folder_id}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )}   
}

NoteListMain.defaultProps = {
  notes: [],
}

