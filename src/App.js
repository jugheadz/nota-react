import React, { Component } from 'react';

import Nav from './components/Nav/Nav';
import Search from './components/Search/Search';
import NotesList from './components/NotesList/NotesList';
import NoteEntry from './components/NoteEntry/NoteEntry';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


import './App.css';

const initialState = {
  notes:[],
  recentnote:[],
  searchfield:'',
  textvalue:'',
  selected:{
    id:'',
    index:''
  },
  route:'signin',
  isSignedIn:false,
  addClass:false,
  user: {
    id: '',
    name: '',
    email: '',
    joined: ''
  }
}
class App extends Component {
  constructor(){
    super()
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email
      }
    })
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true, route:route})
      this.loadUserEntries();
    }else if (route ==='register'){
      this.setState({route: route})
    }else if(route === 'signin'){
      this.setState({route: route})
    }
  }

  loadUserEntries = () => {
    fetch('http://localhost:3000/notes', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        uid:this.state.user.id
      })
      })
      .then(response => response.json())
      .then(notes => {this.setState({ notes:notes })})
      .catch(console.log, 'sign in function')
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  createNote = () => {
    fetch('http://localhost:3000/newnote', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        uid:this.state.user.id
        })
      })
      .then(response => response.json())
      .then(note => {
        const newNotesArray = this.state.notes.slice()
        newNotesArray.unshift(note)
        this.setState(
          {selected:{id:note.id,index:0},
          notes: newNotesArray, 
          textvalue:'',
          addClass:true},
          () => document.getElementById('notelist').firstChild.classList.add('selected')
          )
      })
      .catch(console.log, 'new note function')
  }
  
  onNewNote = () => {
    if(this.state.searchfield==='' && this.state.selected.id===''){
      this.createNote()
    }else{
      document.getElementById('search').value = ''
      this.setState({searchfield:''})
      this.createNote()
    }
  } 

  onDelNote = () => {
    const {selected, notes} = this.state
    if(selected.id!==''){
      fetch('http://localhost:3000/deletenote', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id:selected.id
        })
      })
      .then(response => response.json())
      .then(res => {
        const newNotesArray = notes.slice()
        newNotesArray.splice(selected.index,1)
        this.setState({notes: newNotesArray,textvalue:''})
      })
      .catch(console.log, 'delete note function')
      this.removeSelected()
      this.setState({selected:{id:'',index:''}})
    }    
  }

  removeSelected = () => {
    const noteDivs = document.getElementsByClassName('selected')
      while (noteDivs[0]) {
        noteDivs[0].classList.remove('selected')
      }
  }

  onSelect = (event) => {  
    this.removeSelected()
    event.currentTarget.classList.add('selected')
    const selectedId = event.currentTarget.getAttribute('id')
    const selectedIndex = this.state.notes.findIndex(note => note.id === Number(selectedId))
    console.log(selectedId,'selected id')
    const title = event.currentTarget.querySelector('p.title').textContent
    const note = event.currentTarget.querySelector('p.entry').textContent
    this.setState({selected:{id:selectedId,index:selectedIndex}, textvalue:title+'\n'+note})
    //this.setState({textvalue:title+'\n'+note})
  }

  updateNote = () => {
    const {recentnote} = this.state
    const d = recentnote.updated_at
    const n = this.toISOLocal(d)
    //console.log('sending update')
    fetch('http://localhost:3000/updatenote', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userid:this.state.user.id,
        id:recentnote.id,
        title:recentnote.title,
        note:recentnote.note,
        updated_at:n
      })
    })
    .catch(console.log, 'update note function')
  }

  onblur = (event) => {
    const {recentnote} = this.state
    recentnote === undefined || recentnote.length === 0 ? console.log('empty array') : this.updateNote()
  }

  onNoteInput = (event) => {
    const {selected,notes} = this.state 
    if(selected.id===''){
      this.createNote()
    }else{
      const titleEntry = event.target.value.split('\n',1)
      const title = titleEntry[0]
      const initEntry = event.target.value.replace(title,'')
      const entry = initEntry.trim()
      // const tags = document.getElementById('taginput').value
      const selectedId = Number(selected.id)
      const newNotes = notes.map(note => {
        if (note.id === selectedId){
          return Object.assign({}, note, {
            title: title,
            note: entry,
            updated_at:new Date()
          })
        }else{
          return note;
        }
      })
      const sortedNotes = newNotes.sort((a, b) => {
          a = new Date(a.updated_at)
          b = new Date(b.updated_at)
        return b - a
      })
      
      this.setState({notes:sortedNotes, recentnote:newNotes[0],textvalue:event.target.value})
      //this.setState({selected:{id:selectedId,index:0}})
      clearTimeout(this.timer)
      this.timer = setTimeout(this.updateNote, 1500)
      const noteDivs = document.getElementsByClassName('selected')
      if(noteDivs.length===0){
        console.log(noteDivs)
      }else{
        while (noteDivs[0]) {
          noteDivs[0].classList.remove('selected')
        }
        document.getElementById('notelist').firstChild.classList.add('selected')
      }
    }
  }

  componentWillMount() {
        this.timer = null;
  }

  toISOLocal = (d) => {
  var z = n => (n<10? '0':'')+n;
  var off = d.getTimezoneOffset();
  var sign = off < 0? '+' : '-';
  off = Math.abs(off);

  return d.getFullYear() + '-' + z(d.getMonth()+1) + '-' +
         z(d.getDate()) + 'T' + z(d.getHours()) + ':'  + z(d.getMinutes()) + 
         ':' + z(d.getSeconds()) + sign + z(off/60|0) + z(off%60); 
  }

  render() {
    const { isSignedIn, route, notes, searchfield, textvalue, addClass} = this.state
    const filteredNotes = notes.filter(note => {
      return note.title.toLowerCase().includes(searchfield.toLowerCase())
      || note.note.toLowerCase().includes(searchfield.toLowerCase())
      || note.tags.toLowerCase().includes(searchfield.toLowerCase())
    })
    //console.log(filteredNotes, 'this is the filtered notes state')
    return (
      <div className="App avenir">
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
        ?
        <div className='homepage'>
        <div className="mw9 center search-nav">
          <div className="cf">
            <Search searchChange={this.onSearchChange}/>
            <Nav newNote={this.onNewNote} delNote={this.onDelNote} onRouteChange={this.onRouteChange}/>
          </div>
        </div>
        <div className="mw9 center notes-entries">
          <div className="cf">
            <NotesList notes={filteredNotes} select={this.onSelect} addclass={addClass}/>
            <NoteEntry textvalue={textvalue} onNoteInput={this.onNoteInput} onblur={this.onblur}/>
          </div>
        </div>
        </div>
        : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
