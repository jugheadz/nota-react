import React from 'react';

const Notes = (props) => {
  const {title, note, id, selected} = props;
  return (
      <div className='h3 notes pv2 ph2 note' id={id} onClick={selected}>
        <p className='title ma0'>{title}</p>
        <p className='entry ma0'>{note}</p>
      </div>
  );
}

export default Notes;