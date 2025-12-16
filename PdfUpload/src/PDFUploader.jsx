import { useState } from "react";

const SIGNED_PDF_FILE =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const PDFUploader = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [newPdfLink, setNewPdfLink] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      setIsProcessing(false);
      setNewPdfLink(null);
    } else {
      alert("Only PDF file allowed.");
      setUploadedFile(null);
    }
  };

  const processFile = () => {
    if (!uploadedFile) {
      alert("Please upload a PDF.");
      return;
    } else {
      // Actual server POST the data.
      //---------------------------------------------
      // const formData = new FormData();
      // formData.append('pdfFile', uploadedFile);
      // fetch('/api/upload', { method: 'POST', body: formData });
      console.log(`Mock: Sending file to server: ${uploadedFile.name}`);

      // Mocking processing set
      setIsProcessing(true);

      // Simulate as if server processing
      setTimeout(() => {
        console.log(
          "Processing the server file. In response we get new signed file."
        );
        setIsProcessing(false);
        setNewPdfLink(SIGNED_PDF_FILE);
      }, 3000);
    }
  };

  return (
    <div>
      <h2>PDF Uploader</h2>
      {/* 1. PDF File Selection process. */}
      <section
        style={{
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        <h3>1. Select a PDF file</h3>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
        />
        {uploadedFile && <p>File Selected: {uploadedFile.name}</p>}
      </section>

      {/* 2. Mock Server Saving and Processing */}
      {uploadedFile && (
        <section
          style={{
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <h3>2. Mock Server for Signing process</h3>
          {uploadedFile && <button onClick={processFile}> Upload </button>}
          {isProcessing && (
            <p style={{ color: "orange" }}>
              *Simulating server work (few seconds)...*
            </p>
          )}
        </section>
      )}

      {/* 3. Server Response received.*/}
      {uploadedFile && newPdfLink && (
        <section style={{ padding: "15px" }}>
          <h3>3. New Processed File</h3>
          <div>
            <p style={{ color: "green", fontWeight: "bold" }}>
              Signed PDF is ready.
            </p>

            {/* The anchor tag triggers the download/viewing */}
            <a href={newPdfLink} target="_blank" rel="noopener noreferrer">
              Click here.
            </a>
          </div>
        </section>
      )}
    </div>
  );
};

export default PDFUploader;
