import React, {Component } from 'react'
import Note from '../Note/Note'
import { findNote } from '../notes-helpers';
import './NotePageMain.css';
import NoteContext from '../NoteContext';

export default class NotePageMain extends Component{
  static contextType = NoteContext;
  render() {
    const { noteId } = this.props.match.params;
    const note = findNote(this.context.notes, noteId);
    console.log(note)
  return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
        />
        <div className='NotePageMain__content'>
          {findNote(this.context.notes, noteId).content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>        
    )
  }
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
