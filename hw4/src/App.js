import { useState } from 'react';
import './App.css';
import ImagePreview from './components/ImagePreview';
import ImageUpload from './components/ImageUpload';

/* Функциональный компонент приложения по загрузке превью изображений */
function App() {
  // инициализируем стейт с пустым объектом без полей
  const [images, setImages] = useState({});

  // обработчик загруженных изображений, получает массив объектов 
  // { id : "...", dataUrl : "..."} где id - это md5 хэш dataUrl
  const handleImagesUploaded = (imageArray) => {
    setImages((prevImages) => {
      // используем reduce чтобы превратить массив объектов 
      // Например из массива
      // [{id :"abc", dataUrl : "123"}, {id : "def", dataUrl : "456"}] 
      // В объект
      // { abc : "123", def : "456" }
      // Вся эта канитель нам нужна, чтобы не было дубликатов 
      // среди наших картинок
      return imageArray.reduce( (prevValue, current) => {
        return {...prevValue, [current.id] : current.dataUrl};
      }, prevImages);
    });
  }

  // обработчик удаления картинки
  const handleRemoveClick = (id) => {
    setImages((prevImages) => {
        // копируем объект
        var result = {...prevImages};
        
        // если есть такое поле с называнием значения в id
        if (result[id]) {
          delete result[id]; // выпиливаем
        }
        return result;
    })
  }

  return (
    <>
      <ImageUpload onImagesUploaded={handleImagesUploaded} />
      <br/>
      <ul>
      {
        // Мапим все поля объекта images в набор ImagePreview
        Object.keys(images).map((key) => {
          return <ImagePreview key={key} id={key} dataUrl={images[key]} onRemoveClick={handleRemoveClick} />;
        })        
      }
      </ul>
    </>
  );
}

export default App;
