 import React, { useState } from 'react'
 import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from '@fullcalendar/core';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

interface EventInputWithId extends EventInput {
  id: string;
}

interface CustomCalendarProps {
  events: EventInputWithId[];
  setEvents: React.Dispatch<React.SetStateAction<EventInputWithId[]>>
  newEvent: EventInput;
  setNewEvent: React.Dispatch<React.SetStateAction<EventInput>>
}
 
 const CustomCalendar:React.FC<CustomCalendarProps> = ({ events, setEvents, newEvent, setNewEvent }) => {
  const [clickedEventTitle, setClickedEventTitle] = useState<string>();

  

  const handleDateClick = (arg: any) => {
    setNewEvent({
      ...newEvent,
      start: arg.dateStr,
      end: arg.dateStr,
    });
    const clickedEvent = events.find((event: EventInput) =>
    event.start === arg.dateStr && event.end === arg.dateStr
  );

  if (clickedEvent) {
    setClickedEventTitle(clickedEvent.title);
  } else {
    setClickedEventTitle("");
  }
  };

  const handleDeleteEvent = async () => {
    if (clickedEventTitle) {
      const eventToDelete = events.find((event) => event.title === clickedEventTitle);
      if (eventToDelete) {
        await deleteDoc(doc(db, 'list', eventToDelete.id));
        const updatedEvents = events.filter((event) => event.id !== eventToDelete.id);
        setEvents(updatedEvents);
        setClickedEventTitle("");
      }
    }
  };


   return (
    <>
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
        
            {clickedEventTitle && (
              <div>
                <p>予定: {clickedEventTitle}</p>
                <button onClick={handleDeleteEvent}>削除</button>
              </div>
            )}
            </>
   )
 }
 
 export default CustomCalendar