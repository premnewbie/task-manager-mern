import { create } from "zustand";

export const useDNDStore = create((set) => ({
  dragItem: null,

  handleSetDragItem: (item) => {
    set({dragItem: item})
  },
  
}));
