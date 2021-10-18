import React, { createContext } from 'react'

export const EventsContext = createContext(undefined)
export const EventsProvider = ({ children }) => {

  const on = (event, callback) => {
    document.addEventListener(event, (e) => callback(e.detail))
  }
  const remove = (event, callback) => {
    document.removeEventListener(event, callback);
  }
  const dispatch = (event, data) => {
    document.dispatchEvent(new CustomEvent(event, { detail: data, bubbles: true }));
  }

  return (
    <EventsContext.Provider value={{
      on,
      remove,
      dispatch
    }}>
      {children}
    </EventsContext.Provider>
  )
}