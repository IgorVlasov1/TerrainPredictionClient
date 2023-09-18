import React, { useEffect, useState } from "react";
import "./mainPage.css";
import { sendImages } from "../api/sendImageApi";

const MainPage = () => {
  const [picture, setPicture] = useState([]);
  const [pictureUrls, setPictureUrls] = useState([]);
  const [predictions, setPredictions] = useState([]);
  function pictureUploadHandler(e) {
    const file = e.target.files;
    const urls = [];
    for (let i = 0; i < file.length; i++) {
      urls.push(URL.createObjectURL(file[i]));
    }
    setPicture(file);
    setPictureUrls(urls);
    setPredictions([]);
  }
  useEffect(() => {
    return () => {
      pictureUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [pictureUrls]);

  function sendPictures() {
    const formData = new FormData();
    if (picture.length > 0) {
      for (let i = 0; i < picture.length; i++) {
        formData.append("image", picture[i]);
      }
    }
    sendImages(formData).then((data) => setPredictions(data));
  }
  return (
    <div className="mainPageContainer">
      <input
        id="upload_user_message_picture"
        accept="image/png, image/jpeg"
        encType="multipart/form-data"
        onChange={(e) => pictureUploadHandler(e)}
        name="picture"
        type="file"
        multiple={true}
      />
      <div className="picturesContainer">
        {pictureUrls.map((url, index) => (
          <div key={index}>
            <img
              className={
                pictureUrls.length > 1
                  ? "singlePictureWithMany"
                  : "singlePicture"
              }
              src={url}
              alt={`Image ${index}`}
            />
            {predictions.labels && predictions.labels[index] !== undefined && (
              <p>На картинке: {predictions.labels[index]}</p>
            )}
            {predictions.probabilities &&
              predictions.probabilities[index] !== undefined && (
                <p>Точность: {predictions.probabilities[index]}</p>
              )}
          </div>
        ))}
      </div>
      <button className="sendButton" onClick={sendPictures}>
        Отправить
      </button>
    </div>
  );
};

export default MainPage;
