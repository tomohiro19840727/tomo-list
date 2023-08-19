import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { db } from './firebase';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'; // 追加
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'; // 追加
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

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
  const [events, setEvents] = useState<EventInput[]>([]); // イベントの配列をstateとして管理
  const [showDialog, setShowDialog] = useState(false); // ダイアログ表示用のstate
  const [newEvent, setNewEvent] = useState<EventInput>({
    title: "",
    start: "",
    end: "",
  }); // 新しいイベントの情報を管理
  
    useEffect(() => {
      const getPosts = async () => {
        const data = await getDocs(query(collection(db, 'list')));
        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Todo));
        setEvents(posts);
      }
      getPosts()
    },[])
  

  const handleDateClick = (arg: any) => {
    setShowDialog(true); // ダイアログを表示
    setNewEvent({
      ...newEvent,
      start: arg.dateStr,
      end: arg.dateStr,
    }); // 新しいイベントのstartとendをセット
  };

  const handleAddEvent =  async () => {
    setEvents([...events, newEvent]); // イベントを配列に追加
    setShowDialog(false); // ダイアログを閉じる
    await addDoc(collection(db, 'list'), newEvent);
    setNewEvent({
      title: "",
      start: "",
      end: "",
    }); // 新しいイベント情報をリセット
    console.log(events)
  };
  
  return (
    <>
        <div>
        <h1 className="text-center font-serif text-6xl mt-10">タスク管理</h1>
        <div className="mr-40 ml-40 mt-20">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin,listPlugin ]}
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
          locales={[jaLocale]}         // 追加
          locale='ja'  
          dateClick={handleDateClick}
          // dateClick={handleDateSelect}
          />
        </div>
        </div>

        <div className="">
          <h2>Add New Event</h2>
          <label>Title:</label>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                title: e.target.value,
              })
            }
            />
           {newEvent && (
            <p>{newEvent.start?.toLocaleString()}</p>
             )}
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
            </>
  );
};

export default App;
