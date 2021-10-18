import { useContext } from 'react'
import { EventsContext } from '../contexts/EventContext'

const useEventsContext = () => {
  const eventsContext = useContext(EventsContext)

  if (eventsContext === undefined) {
    throw new Error('Events context undefined')
  }

  return eventsContext
}

export default useEventsContext
