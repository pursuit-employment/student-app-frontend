import React, {useState, useEffect} from 'react';

import './TagInputField.scss';

function TagInputField ({tags, setTags, id }) {

    const [tag, setTag] = useState('');

    useEffect(() => {
        const keyDownHandler = event => {
    
          if (event.key === 'Enter') {
            event.preventDefault();
    
            handleSubmit(event);
          }
        };

        const input = document.getElementById('studentTagInput' + id);
    
        input.addEventListener('keydown', keyDownHandler);
    
        return () => {
          input.removeEventListener('keydown', keyDownHandler);
        };
      }, []);

      const handleSubmit = (event) => {
        let pendingTag = event.target.value;
        
        if(!pendingTag) return;
        
        setTags((tags) => [...tags, pendingTag]);
        setTag('');
      }


    return (
        <input 
            className="tagInputField" 
            id={'studentTagInput' + id}
            placeholder='Add a tag'
            value={tag} 
            onChange={(e) => setTag(e.target.value)}
        />
    );
}

export default TagInputField;