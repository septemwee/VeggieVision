// components/uploadModal.js

'use client';

import React, { useState, useRef } from 'react';

// Icon Components (ไม่มีการเปลี่ยนแปลง)
const FileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-green-500"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>;
const AILoadingIcon = () => (
    <svg className="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


export default function UploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); 
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0); 
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) { setSelectedFile(file); }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setError("Please select a file first!");
      return;
    }

    setError('');
    setUploadStatus('uploading');
    setProgress(0); 
    const UPLOAD_DURATION = 2000;
    const AI_ANALYSIS_DURATION = 3000;

    // --- 1. เริ่ม Progress Bar สำหรับ UPLOAD (วิ่ง 2 วินาที) ---
    setTimeout(() => {
        setProgress(100); 
    }, 50);

    // --- 2. เปลี่ยนเป็นสถานะ ANALYZING ---
    setTimeout(() => {
      setUploadStatus('analyzing');
      setProgress(0); // Reset Progress Bar
      
      // --- 3. เริ่ม Progress Bar สำหรับ AI ANALYSIS (วิ่ง 3 วินาที) ---
      setTimeout(() => {
        setProgress(100); 
      }, 50);
      
      // --- 4. เปลี่ยนเป็นสถานะ SUCCESS ---
      setTimeout(() => {
        setUploadStatus('success');
        const imageUrl = URL.createObjectURL(selectedFile);
        onUploadSuccess(imageUrl);

        setTimeout(() => {
          handleClose();
        }, 1000);

      }, AI_ANALYSIS_DURATION); 

    }, UPLOAD_DURATION); 
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSelectedFile(null);
      setUploadStatus('idle');
      setError('');
      setProgress(0); 
    }, 300);
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-0">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-md mx-auto p-4 sm:p-6 relative transition-all transform scale-100 opacity-100">
        <button onClick={handleClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 p-1">
          <CloseIcon />
        </button>

        {/* --- สถานะปกติ: ให้เลือกไฟล์ --- */}
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

        {/* --- สถานะกำลังอัปโหลด --- */}
        {uploadStatus === 'uploading' && (
          <div className="flex flex-col items-center justify-center h-48">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Uploading File...</h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              {/* Progress Bar สำหรับอัปโหลด: สไตล์มาตรฐาน */}
              <div 
                className="bg-green-600 h-2.5 rounded-full transition-all duration-2000 ease-out"
                style={{ width: `${progress}%` }} 
              ></div>
            </div>
            <p className="mt-4 text-gray-500 text-sm truncate w-full px-2 text-center">{selectedFile.name}</p>
          </div>
        )}

        {/* --- สถานะกำลังวิเคราะห์ด้วย AI --- */}
        {uploadStatus === 'analyzing' && (
          <div className="flex flex-col items-center justify-center h-48">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">AI Analyzing Image...</h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-green-600 h-2.5 rounded-full transition-all duration-[3000ms] ease-out"
                style={{ width: `${progress}%` }} 
              ></div>
            </div>
            <p className="mt-4 text-gray-500 text-sm w-full px-2 text-center">Processing with machine learning model.</p>
          </div>
        )}

        {/* --- สถานะสำเร็จ --- */}
        {uploadStatus === 'success' && (
          <div className="flex flex-col items-center justify-center h-48">
            <CheckIcon />
            <h2 className="text-xl font-bold text-gray-800 mt-4 text-center">Analysis Complete!</h2>
          </div>
        )}
      </div>
    </div>
  );
}