import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updateToPaste } from '../redux/pasteSlice.js';

const Home = () => {
    const allpastes = useSelector((state) => state.paste.pastes); 

    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();

    useEffect(() => {
        if (pasteId) {
            const paste = allpastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId]);

    function createPaste() {
        const paste = {
            title,
            content: value,
            _id: pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) dispatch(updateToPaste(paste));
        else dispatch(addToPaste(paste));

        setTitle("");
        setValue("");
        setSearchParams({});
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white px-6 py-10">
            <div className="w-full max-w-4xl bg-gray-800/40 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-lg">
                <div className="flex flex-col sm:flex-row gap-5 items-center justify-between mb-6">
                    <input
                        className="w-full sm:w-[65%] p-3 rounded-2xl bg-gray-900/80 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                        type="text"
                        placeholder="Enter title here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <button
                        onClick={createPaste}
                        className="w-full sm:w-auto px-6 py-3 bg-teal-400 text-black font-semibold rounded-2xl hover:bg-teal-300 transition duration-300 shadow-lg hover:shadow-teal-500/30"
                    >
                        {pasteId ? "Update My Paste" : "Create My Paste"}
                    </button>
                </div>

                <textarea
                    className="w-full h-[450px] bg-gray-900/80 text-gray-100 placeholder-gray-500 p-4 rounded-2xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
                    placeholder="Enter content here"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    );
};

export default Home;
