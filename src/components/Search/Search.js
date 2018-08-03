import React from 'react';

const Search = ({searchfield, searchChange, newNote}) => {
  return (
    <div className="fl w-100 w-third br bb b--light-gray h-100">
        <div className="bg-white h-100">
        <div className='pv2 ph3'>
			<input 
			id='search'
			className='ba w-100 h-100 br2'
			type='search' 
			placeholder='search notes'
			onChange={searchChange}
			/>
		</div>
        </div>
    </div>
  );
}

export default Search;