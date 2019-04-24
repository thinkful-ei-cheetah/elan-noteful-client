import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import NoteContext from '../NoteContext';
import { getNotesForFolder } from '../notes-helpers'

export default function NoteListMain(props) {
  const { folderId } = props.match.params;
  return (
    <NoteContext.Consumer>
    {({notes}) => (
      <section className='NoteListMain'>
        <ul>
          {getNotesForFolder(notes, folderId).map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
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
    </NoteContext.Consumer>
    
  )
}

NoteListMain.defaultProps = {
  notes: [],
}
