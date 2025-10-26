import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import {
  Edit,
  Eye,
  Trash2,
  Copy,
  Share2,
} from 'lucide-react';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  // Define a consistent Tailwind class for the teal button theme
  const tealButtonClass = "p-2 bg-teal-400 text-black rounded-xl hover:bg-teal-300 transition";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white px-6 py-10 flex flex-col items-center">
      {/* 🔍 Search Box */}
      <input
        className="w-full max-w-2xl p-3 rounded-2xl bg-gray-900/80 text-gray-200 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
        type="search"
        placeholder="Search pastes by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 📜 Paste List */}
      <div className="w-full max-w-4xl flex flex-col gap-6 mt-8">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-teal-500/10 transition-all duration-300"
            >
              {/* 🏷️ Title */}
              <h2 className="text-xl font-semibold text-teal-400 mb-2">
                {paste.title}
              </h2>

              {/* 📝 Content */}
              <p className="text-gray-300 text-sm whitespace-pre-wrap mb-4">
                {paste.content}
              </p>

              {/* ⚙️ Buttons with icons */}
              <div className="flex flex-wrap gap-3 mb-3">
                <a
                  href={`/?pasteId=${paste?._id}`}
                  className={tealButtonClass} // MODIFIED: Teal theme
                  title="Edit"
                >
                  <Edit size={18} />
                </a>

                <a
                  href={`/pastes/${paste?._id}`}
                  className={tealButtonClass} // MODIFIED: Teal theme
                  title="View"
                >
                  <Eye size={18} />
                </a>

                <button
                  onClick={() => handleDelete(paste?._id)}
                  className={tealButtonClass} // MODIFIED: Teal theme
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success('Copied to clipboard');
                  }}
                  className={tealButtonClass} // MODIFIED: Teal theme
                  title="Copy"
                >
                  <Copy size={18} />
                </button>

                <button
                  onClick={() => {
                    navigator.share({
                      title: paste.title,
                      text: paste.content,
                      url: window.location.href,
                    });
                  }}
                  className={tealButtonClass} // MODIFIED: Teal theme
                  title="Share"
                >
                  <Share2 size={18} />
                </button>
              </div>

              {/* 🕒 Created Time */}
              <div className="text-gray-400 text-xs">
                Created At: {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 mt-10 text-center">
            No pastes found. Try creating one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Paste;

