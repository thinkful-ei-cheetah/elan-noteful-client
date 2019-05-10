import React, {Component } from 'react'
import Note from '../Note/Note'
import { findNote } from '../notes-helpers';
import './NotePageMain.css';
// import { shape, string } from 'prop-types'
import NoteContext from '../NoteContext';

export default class NotePageMain extends Component{
  static contextType = NoteContext;
  render() {
    const { noteId } = this.props.match.params;
    const note = findNote(this.context.notes, parseInt(noteId));
  return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
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

// NotePageMain.propTypes = {
//   match: shape({
//     params: shape({
//       noteId: string
//     })
//   })
// }
