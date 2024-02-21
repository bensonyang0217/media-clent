import axios from "axios";
import React, { useState } from "react";
import NavBar from "../../compoment/NavBar";
import "../../css/MediaPage.css";
const MediaForm = () => {
  const [file, setFile] = useState(null);
  const [uploads, setUploads] = useState([]);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUploads([...uploads, response.data]); // 假设响应数据包含上传信息
    } catch (error) {
      console.error("上传失败", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="media-form-container">
        <h1>檔案上傳</h1>
        <br />
        <div className="upload-section">
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
          />
          <button onClick={handleUpload} className="upload-button">
            Upload
          </button>
        </div>
        <h1>縮圖資訊</h1>
        <div className="uploads-list">
          <table className="uploads-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Size</th>
                <th>Scaling Status</th>
                <th>Url</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload, index) => (
                <tr key={index}>
                  <td>{upload.fileName}</td>
                  <td>{upload.size}</td>
                  <td>{upload.scalingStatus}</td>
                  <td>
                    <a
                      href={upload.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
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
