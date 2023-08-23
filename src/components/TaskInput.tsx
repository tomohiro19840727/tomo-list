import React from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import {
  EventInput,
} from '@fullcalendar/core'

interface EventInputWithId extends EventInput {
  id: string;
}

interface TaskInputProps {
  events: EventInputWithId[];
  setEvents: React.Dispatch<React.SetStateAction<EventInputWithId[]>>
  newEvent: EventInput;
  setNewEvent: React.Dispatch<React.SetStateAction<EventInput>>
}




const TaskInput: React.FC<TaskInputProps> = ( { events, setEvents, newEvent, setNewEvent }) => {
  
  
  const handleAddEvent = async () => {
    const docRef = await addDoc(collection(db, 'list'), newEvent); 
    setEvents([...events, { ...newEvent, id: docRef.id }]);
    setNewEvent({
      title: "",
      start: "",
      end: "",
    });
  };

  

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">First name*</label>
              {newEvent && (
                <p>{newEvent.start?.toLocaleString()}</p>
              )}
            </div>

            <div>
              <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Last name*</label>
              {newEvent && (
                <p>{newEvent.start?.toLocaleString()}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Title</label>
              <input
                name="title"
                type="text"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    title: e.target.value,
                  })
                }
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none focus:ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <div className="flex items-center justify-between sm:col-span-2">
              <button
                onClick={() => handleAddEvent()}
                className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none focus:ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default TaskInput