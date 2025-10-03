// components/uploadModal.js

'use client';

import React, { useState, useRef } from 'react';

const FileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-green-500"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>;

export default function UploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle', 'uploading', 'success'
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

 
  const handleClose = () => {
    onClose();
    setSelectedFile(null);
    setUploadStatus("idle");
    setError("");
  };

  const handleFileSelect = (e) => setSelectedFile(e.target.files[0]);

  const handleUpload = async () => {
    
    // *** จุดที่ 1: Log ก่อนการตรวจสอบไฟล์ ***
    console.log("--- DEBUG START ---");
    console.log("Selected File State:", selectedFile); 
    // ถ้าตัวนี้เป็น null แปลว่าไฟล์ไม่ถูกเลือก

       if (!selectedFile) { 
        setError("Please select a file!"); 
        console.log("Upload stopped: selectedFile is null.");
        return; 
    }

    setUploadStatus("uploading");
    setError("");

    const formData = new FormData();
   formData.append("image", selectedFile);

// *** จุดที่ 2: ตรวจสอบ FormData ก่อนส่ง (ถ้าถึงจุดนี้ แปลว่า selectedFile ไม่ใช่ null) ***
    console.log("Selected File Name:", selectedFile.name);
    console.log("Does FormData have 'image'? ", formData.has("image"));
    console.log("------------------------");

    try {
      const res = await fetch("/api/test", { method: "POST", body: formData });
      const data = await res.json();

      if (data.status === "success") {
        setUploadStatus("success");
        const imageUrl = URL.createObjectURL(selectedFile);
        onUploadSuccess(imageUrl, data.predictions);
        setTimeout(handleClose, 1000);
      } else {
        setError(data.error || "Upload failed");
        setUploadStatus("idle");
      }
    } catch (err) {
      setError(err.message);
      setUploadStatus("idle");
    }
  };



  return (
    // 🔴 ปรับ Backdrop: ใช้ bg-black/50 ที่รองรับดีกว่า และเพิ่ม backdrop-blur-sm
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-0">
      {/* 🔴 ปรับ Modal Content: ขนาดและ padding responsive */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-md mx-auto p-4 sm:p-6 relative transition-all transform scale-100 opacity-100">
        <button onClick={handleClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 p-1">
          <CloseIcon />
        </button>

        {/* --- ส่วนที่แสดงผลจะเปลี่ยนไปตามสถานะ --- */}

        {/* สถานะปกติ: ให้เลือกไฟล์ */}
        {uploadStatus === 'idle' && (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upload File</h2>
            <div 
              className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors ${
                error ? 'border-red-500' : 'border-gray-300 hover:border-green-500'
              }`}
              onClick={() => fileInputRef.current.click()}
            >
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} />
              <p className="text-gray-500 text-sm sm:text-base">{selectedFile ? `Selected: ${selectedFile.name}` : 'Click to select a file'}</p>
            </div>
            {selectedFile && (
              <div className="mt-4 flex items-center gap-2 p-2 bg-gray-100 rounded break-words">
                <FileIcon />
                <span className="text-sm text-gray-700 truncate">{selectedFile.name}</span>
              </div>
            )}

            <div className="h-6 mt-2 text-center">
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button onClick={handleClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm sm:text-base">Cancel</button>
              <button onClick={handleUpload} className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 text-sm sm:text-base">Upload</button>
            </div>
          </>
        )}

        {/* สถานะกำลังอัปโหลด: แสดง Progress Bar */}
        {uploadStatus === 'uploading' && (
          <div className="flex flex-col items-center justify-center h-48">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Uploading...</h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-green-600 h-2.5 rounded-full animate-progress"></div>
            </div>
            <p className="mt-4 text-gray-500 text-sm truncate w-full px-2 text-center">{selectedFile.name}</p>
          </div>
        )}

        {/* สถานะสำเร็จ: แสดงเครื่องหมายถูก */}
        {uploadStatus === 'success' && (
          <div className="flex flex-col items-center justify-center h-48">
            <CheckIcon />
            <h2 className="text-xl font-bold text-gray-800 mt-4 text-center">Upload Successful!</h2>
          </div>
        )}
      </div>
    </div>
  );
}