import { FormEvent, useState } from "react";
import Button from "../reusable/Button";
import { useNavigate, useParams } from "react-router-dom";

import { AppointmentData } from "../AppointmentListing";

const BookAppointmentForm = ({
  doctorId,
  patientId,
  sendData,
  className,
}: {
  doctorId: number;
  patientId: number;
  sendData: (args: AppointmentData) => Promise<boolean>;
  className?: string;
}) => {
  const navigate = useNavigate();
  const [type, setType] = useState<string>("");

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const getNextWeek = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1 - now.getDay()); // Pomera na sledeću nedelju
    now.setHours(8, 0, 0, 0); // Početak radnog vremena
    return now.toISOString().slice(0, 10); // Format za datetime-local
  };

  const getNextWeekMax = () => {
    const now = new Date();
    now.setDate(now.getDate() + (7 - now.getDay())); // Pomera na sledeću nedelju
    now.setHours(8, 0, 0, 0); // Početak radnog vremena

    const maxDate = new Date(now.toISOString().slice(0, 16));
    maxDate.setHours(14, 0, 0, 0); // Kraj radnog vremena
    return maxDate.toISOString().slice(0, 10);
  };
  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirm("Are you sure you want to book this appointment?")) {
      const appointment: AppointmentData = {
        appointmentTime: [date, time].join("T"),
        doctorId,
        patientId,
        type,
      };

      sendData(appointment);
    }
  };
  return (
    <form onSubmit={submitForm} className={className}>
      <input
        type="text"
        placeholder="What's appointment for?"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => {
          setType(e.target.value);
        }}
        minLength={3}
        value={type}
        required
      />
      <input
        type="date"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => {
          setDate(e.target.value);
        }}
        value={date}
        min={getNextWeek()}
        max={getNextWeekMax()}
        required
      />
      <input
        type="time"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => {
          setTime(e.target.value);
        }}
        value={time}
        step={1800}
        required
      />
      <div className="flex justify-between">
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          style="DANGER"
        >
          Cancel
        </Button>
        <Button type="submit">Confirm</Button>
      </div>
    </form>
  );
};

export default BookAppointmentForm;
