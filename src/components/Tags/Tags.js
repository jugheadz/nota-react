import React from 'react';

const Tags = ({tagsvalue, handleTagInput, onblur}) => {
  return (
    <div className="fl w-100 w-two-thirds bb b--light-gray h-100 ph4 pv2">
 		<div className="bg-white h-100">
 			<input 
			className='w-90 h-100 addTags'
			id='taginput'
			type='text' 
			placeholder='add tags'
			value={tagsvalue}
			onChange={handleTagInput}
			onBlur={onblur}
			/>
 		</div>
    </div>
  );
}

export default Tags;