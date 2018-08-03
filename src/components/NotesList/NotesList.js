import React from 'react';
import Notes from '../Notes/Notes';

const NotesList = ({notes,select}) => {
  return (
    <div className="fl w-100 w-third br b--light-gray h-100 overflow-auto" id="notelist">
      {
        notes.map((user,i)=>{
            return (
              <Notes 
                selected={select}
                key={i} 
                id={user.id} 
                title={user.title} 
                note={user.note}
              />
            );
          })
      }
    </div> 
  );
}
export default NotesList;