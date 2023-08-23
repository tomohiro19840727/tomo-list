import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { db } from './firebase';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";

import {
  EventInput,
} from '@fullcalendar/core'

interface Todo {
  id: string;
  title: string;
  start: string;
  end: string;
}

const App: React.FC = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newEvent, setNewEvent] = useState<EventInput>({
    title: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(collection(db, 'list')));
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Todo));
      setEvents(posts);
    }
    getPosts()
  }, [])

  const handleDateClick = (arg: any) => {
    setShowDialog(true);
    setNewEvent({
      ...newEvent,
      start: arg.dateStr,
      end: arg.dateStr,
    });
  };

  const handleAddEvent = async () => {
    setEvents([...events, newEvent]);
    setShowDialog(false);
    await addDoc(collection(db, 'list'), newEvent);
    setNewEvent({
      title: "",
      start: "",
      end: "",
    });
  };

  return (
    <>
      <div>
        <h1 className="text-center font-serif text-6xl mt-10">タスク管理</h1>
        <div className="mx-8 mt-20"> {/* Tailwind CSSのマージン調整 */}
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            initialView='dayGridMonth'
            weekends={true}
            nowIndicator={true}
            selectable={true}
            events={events}
            locales={[jaLocale]}
            locale='ja'
            dateClick={handleDateClick}
          />
        </div>
      </div>

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
                onClick={handleAddEvent}
                className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none focus:ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
