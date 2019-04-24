import React from 'react';

const NoteContext = React.createContext({
  notes: [],
  folders: [],
  handleDelete: () => {}
});

export default NoteContext;
