"use client"

import { createContext, useState } from "react";

export const Lang_data = createContext(null);

function Context({ children }) {
    const [Language, setLang] = useState("en");
  
    return (
      <Lang_data.Provider value={{ Language, setLang }}>
        {children}
      </Lang_data.Provider>
    );
  }

  export default Context