import React from 'react'
import PropTypes from 'prop-types'
import md5 from 'md5';

/* Функциональный компонент загрузки превью изображения  */
function ImageUpload({onImagesUploaded}) {
    // Позови меня, я объясню код ниже, иначе это будет целая
    // бляцкая поэма тут, а лампады и пера у меня нет
    const fileToDataUrl = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.addEventListener('load', event => {
                resolve(event.currentTarget.result);
            });
            
            fileReader.addEventListener('error', event => {
                reject(new Error(event.currentTarget.error));
            });
            
            fileReader.readAsDataURL(file);
        });
    }

    const handleSelect = async (event) => {
        const files = [...event.target.files];
        const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
        const results = urls.map((url) => ( {id : md5(url), dataUrl : url} ));
        onImagesUploaded(results);
    }

    return (
    <div>
        <input type="file" accept="image/*" onChange={handleSelect} multiple/>
    </div>
    )
}

ImageUpload.propTypes = {
    onImagesUploaded : PropTypes.func.isRequired
}

export default ImageUpload
