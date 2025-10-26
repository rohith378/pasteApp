import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updateToPaste } from '../redux/pasteSlice.js';

const ViewPaste = () => {
  const { id } = useParams();
  const allpastes = useSelector((state) => state.paste.pastes);
  const paste = allpastes.filter((p) => p._id === id)[0];
  console.log(paste);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white px-6 py-10">
      <div className="w-full max-w-4xl bg-gray-800/40 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-lg">
        {/* 🏷️ Title */}
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-between mb-6">
          <input
            className="w-full sm:w-[65%] p-3 rounded-2xl bg-gray-900/80 text-gray-200 placeholder-gray-400 border border-gray-700 focus:outline-none cursor-not-allowed"
            type="text"
            placeholder="Enter title here"
            value={paste?.title || ''}
            disabled
          />
        </div>

        {/* 📝 Content */}
        <textarea
          className="w-full h-[450px] bg-gray-900/80 text-gray-100 placeholder-gray-500 p-4 rounded-2xl border border-gray-700 focus:outline-none cursor-not-allowed resize-none"
          placeholder="Enter content here"
          value={paste?.content || ''}
          disabled
          rows={20}
        />

        {/* 🕒 Info Footer */}
        <div className="text-gray-400 text-xs mt-4 text-right">
          Created At: {paste?.createdAt ? new Date(paste.createdAt).toLocaleString() : 'Unknown'}
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
