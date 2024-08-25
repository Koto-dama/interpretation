import React, { useState } from 'react';

function PDFUploader() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setUploadStatus(null); // Reset status on file change
        } else {
            setUploadStatus('Please select a valid PDF file.');
            setSelectedFile(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('No file selected. Please choose a PDF file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('https://localhost:7117/api/DocumentUpload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setUploadStatus('File uploaded successfully.');
            } else {
                setUploadStatus(`Failed to upload file. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('An error occurred while uploading the file.');
        }
    };

    return (
        <div>
            <h1>Upload PDF</h1>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
}

export default PDFUploader;