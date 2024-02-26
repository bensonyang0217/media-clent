import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../../compoment/NavBar";
import "../../css/MediaPage.css";

const MediaForm = () => {
  const [file, setFile] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const imagesUrl = "https://media-api-v2-f4hfj5ldpa-de.a.run.app/api/images";
  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const response = await axios.get(imagesUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        setUploads(response.data);
      } catch (error) {
        console.error("Error fetching thumbnails", error);
      }
    };

    fetchThumbnails();
    const intervalId = setInterval(fetchThumbnails, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadMessage("");
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const uploadFileUrl =
      "https://media-api-v2-f4hfj5ldpa-de.a.run.app/api/images/upload";
    try {
      await axios.post(uploadFileUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const thumbnailsResponse = await axios.get(imagesUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUploadMessage("upload！");
      setFile(null);
      document.querySelector(".file-input").value = "";
      //   console.log(thumbnailsResponse.data);
      setUploads(thumbnailsResponse.data);
    } catch (error) {
      console.error("upload error", error);
      setUploadMessage("upload error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="media-form-container">
        <h1>檔案上傳</h1>
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
        {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
        <div className="upload-section">
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
          />
          <button
            onClick={handleUpload}
            className="upload-button"
            disabled={isLoading}
          >
            Upload
          </button>
        </div>
        <h1>縮圖資訊</h1>
        <div className="uploads-list">
          <table className="uploads-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>File Name</th>
                <th>Origin Size</th>
                <th>Scaling Size</th>
                <th>Scaling Status</th>
                <th>Upload Time</th>
                <th>Image</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{upload.fileName}</td>
                  <td>{upload.fileSize}</td>
                  <td>{upload.scalingSize ? upload.scalingSize : 0}</td>
                  <td>{upload.thumbnailStatus ? "已完成" : "執行中"}</td>
                  <td>{upload.uploadDate}</td>
                  <td>
                    <img src={upload.thumbnailUrl} alt={upload.fileName} />
                  </td>
                  <td>
                    <a
                      href={upload.thumbnailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MediaForm;
