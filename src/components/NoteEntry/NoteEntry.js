import React from 'react';

const NoteEntry = ({onNoteInput, textvalue, onblur}) => {
    
  return (
    <div className="fl w-100 w-two-thirds b--light-gray h-100">
        <div className="bg-white pv3 ph4 h-100">
        	<div className='h-100'>
        		<textarea 
                id='txtarea'
        		className='h-100 w-100' 
        		placeholder='your note entry'
                onBlur={onblur}
        		onChange={onNoteInput}
                value={textvalue}
                >
        		</textarea>
        	</div>
        </div>
    </div>
  );
}

export default NoteEntry;