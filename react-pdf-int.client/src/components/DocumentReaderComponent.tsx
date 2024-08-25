import { useEffect, useState } from 'react';

interface Document {
    documentContent: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
}

function UploadPdf() {
    //create a component that will allow the user to upload a pdf file
    const [documents, setDocuments] = useState<Document[]>();

    useEffect(() => {
        populateDocumentData();
    }, []);

    async function populateDocumentData() {
        const response = await fetch('https://localhost:7117/api/DocumentUpload');
        const data = await response.json();
        console.log(data);
        setDocuments(data);
    }

    const contents = documents === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Content</th>
                </tr>
            </thead>
            <tbody>
                {documents.map((document, index) =>
                    <tr key={`${document.documentName}-${index}`}>
                        <td>{document.documentName}</td>
                        <td>{document.documentType}</td>
                        <td>{document.documentStatus}</td>
                        <td>{document.documentContent}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
            <div>
                <h1 id="tableLabel">Document Upload</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
    );
}

export default UploadPdf;