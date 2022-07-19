import React from 'react'
import PropTypes from 'prop-types'

/* Функциональный компонент который отображает превью картинки */
function ImagePreview({id, dataUrl, onRemoveClick}) {
    const handleClick = (event) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (onRemoveClick) {
            onRemoveClick(id);
        }
    }
  return (
    <div>
        <img src={dataUrl} alt={id} width="128" height="auto" /> 
        <button onClick={handleClick}>X</button>
    </div>
  )
}

ImagePreview.propTypes = {
    id : PropTypes.string.isRequired,
    dataUrl : PropTypes.string.isRequired,
    onRemoveClick : PropTypes.func
}

export default ImagePreview
