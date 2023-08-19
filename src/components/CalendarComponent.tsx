import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CalendarComponentProps {
  onSelectDate: (date: Date) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onSelectDate }) => {
  return (
    <div>
      <h2>カレンダー</h2>
      
    
        <Calendar onClickDay={onSelectDate} />
    
    </div>
  );
};

export default CalendarComponent;
