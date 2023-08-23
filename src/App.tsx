import React, { useState, useEffect } from "react";
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './firebase';
import {
  EventInput,
} from '@fullcalendar/core'
import TaskInput from "./components/TaskInput";
import CustomCalendar from "./components/CustomCalendar";

interface Todo {
  id: string;
  title: string;
  start: string;
  end: string;
}

interface EventInputWithId extends EventInput {
  id: string;
}

const App: React.FC = () => {
  const [events, setEvents] = useState<EventInputWithId[]>([]);
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

  return (
    <>
      <div>
        <h1 className="text-center font-serif text-6xl mt-10">仕事タスク管理</h1>
        <div className="mx-8 mt-20"> {/* Tailwind CSSのマージン調整 */}
          <CustomCalendar events={events} setEvents={setEvents} newEvent={newEvent} setNewEvent={setNewEvent} />
        </div>
      </div>

      <TaskInput events={events} setEvents={setEvents} newEvent={newEvent} setNewEvent={setNewEvent}  />
    </>
  );
};

export default App;
