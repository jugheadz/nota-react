import React from 'react';
import pen from './pen.png';
import trash from './trash.png'

const Nav = ({newNote, delNote, onRouteChange}) => {
  return (
    <div className="fl pa2 w-100 w-two-thirds bb b--light-gray h-100">
    	<div className="fl w-50 h-100 pa1">
    		<img onClick={newNote} id='newNoteBtn' className='pr2' src={pen} alt='new note' width='22' height='22'/>
    		<img onClick={delNote} id='delNoteBtn' className='pr2' src={trash} alt='delete note' width='22' height='22'/>
    	</div>
 		<div className="fr bg-white h-100 blue pa1" id='signout' onClick={() => onRouteChange('signout')}>signout</div>
    </div>
  );
}

export default Nav;