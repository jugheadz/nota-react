import React from 'react';

const TagsDropdown = ({handleShowTags,showTags, handleTagsList, notes}) => {
  return (
    <div className="fl w-100 w-third br bb b--light-gray h-100">
 		<div className="bg-white h-100 w-100 pa2">
 			<button onClick={handleShowTags}>
 				Tags
 			</button>
 			{ showTags
 				? (
 				<div id='tags' className='db z-5 w-20 bg-white br2 ba b--light-gray fixed'>
 					<ul className='list'>{
 						notes.map((note,i)=>{
 							return (<li key={i} className='ma1' onClick={handleTagsList}>{note.tags}</li>)
 						})
 					}
 					</ul>
 				</div>
 				)
 				: (
 					null
 				)
 			}
 		</div>
    </div>
  );
}

export default TagsDropdown;