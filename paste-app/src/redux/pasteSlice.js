import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


const initialState = {
  pastes:localStorage.getItem("pastes") 
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
   addToPaste: (state,action) => {
       const paste = action.payload;


       state.pastes.push(paste);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
       toast.success("Paste created successfully")
    },
    updateToPaste: (state, action) => {
    // Use standard camelCase: 'updatedPaste'
    const updatedPaste = action.payload;
    
    // Use 'updatedPaste' here
    const index = state.pastes.findIndex(paste => paste._id === updatedPaste._id); 

    if (index >= 0) {
        // Use 'updatedPaste' here
        state.pastes[index] = updatedPaste; 
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
    }
},
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPaste:(state,action) => {
      const pasteid = action.payload;

      console.log(pasteid);
      const index = state.pastes.findIndex((item) => item._id === pasteid);

      
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Deleted successfully");
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPastes, removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer