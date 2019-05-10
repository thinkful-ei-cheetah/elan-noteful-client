import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteContext from '../NoteContext';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import Error from '../Error'
import { findNote, findFolder } from '../notes-helpers';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: null
  };
  FolderUrl = 'http://localhost:8000/api/folders';
  NoteUrl = 'http://localhost:8000/api/notes';

  componentDidMount() {
    // fake date loading from API call
    // setTimeout(() => this.setState(dummyStore), 600);

    fetch(this.FolderUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          folders: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });

    fetch(this.NoteUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          notes: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }


  handleAddNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  handleAddFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  handleDeleteNote = (id) => {
    const newNotes = this.state.notes.filter(note => note.id !== id);
    const options = {
      method: 'DELETE'
    }
    fetch(`${this.NoteUrl}/${id}`, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          notes: newNotes,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })
  }

  handleDeleteFolder = id => {
    const newFolders = this.state.folders.filter(folder => folder.id !== id);
    const options = {
      method: 'DELETE'
    }
    fetch(`${this.FolderUrl}/${id}`, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          folders: newFolders,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })
  }

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {['/', '/folder/:folder_id'].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
        <Route path='/add-folder' component={NotePageNav} />
        <Route path='/add-note' component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              return <NoteListMain {...routeProps} />;
            }}
          />
        ))}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            return <NotePageMain {...routeProps} />;
          }}
        />
        <Route path='/add-folder' component={AddFolder} />
        <Route path='/add-note' component={AddNote} />
      </>
    );
  }
  render() {
    return (
      <Error>
        <NoteContext.Provider
          value={{ 
            folders: this.state.folders, 
            notes: this.state.notes, 
            handleDelete: this.handleDeleteNote, 
            handleFolder: this.handleDeleteFolder, 
            handleAdd: this.handleAddNote, 
            handleFolderAdd: this.handleAddFolder }}
        >
          <div className='App'>
            <nav className='App__nav'>{this.renderNavRoutes()}</nav>
            <header className='App__header'>
              <h1>
                <Link to='/'>Noteful</Link>{' '}
                <FontAwesomeIcon icon='check-double' />
              </h1>
            </header>
            <main className='App__main'>{this.renderMainRoutes()}</main>
          </div>
        </NoteContext.Provider>
      </Error>
    );
  }
}

export default App;
