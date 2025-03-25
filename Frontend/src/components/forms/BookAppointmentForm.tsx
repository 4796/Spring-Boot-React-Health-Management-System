import { FormEvent, useEffect, useState } from "react";
import Button from "../reusable/Button";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { AppointmentData, AppointmentSuggestions } from "../AppointmentListing";
import { All } from "../../roles/All";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../reusable/Spinner";

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
  const getTomorrow = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1);

    return now.toISOString().slice(0, 10);
  };

  const getNextWeekMax = () => {
    const now = new Date();
    now.setDate(now.getDate() + 8);
    const maxDate = new Date(now.toISOString().slice(0, 16));

    return maxDate.toISOString().slice(0, 10);
  };
  const navigate = useNavigate();
  const [type, setType] = useState<string>("");
  const [date, setDate] = useState<string>(getTomorrow());
  const [time, setTime] = useState<string>("");
  const globalParams: { user: All } = useOutletContext();

  const { data, isLoading, error } = useQuery<string[] | null>({
    queryKey: ["date", date],
    queryFn: (): Promise<string[] | null> => {
      return globalParams.user.getAppointmentSuggestions("" + doctorId, date);
    },

    staleTime: 1000 * 60 * 5, // 5 mins
  });
  useEffect(() => {
    setTime(data ? data[0] : "");
  }, [data]);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirm("Are you sure you want to book this appointment?")) {
      const appointment: AppointmentData = {
        appointmentTime: [date, time].join("T"),
        doctorId,
        patientId,
        type,
      };

      sendData(appointment).then((d) => {
        if (d) navigate(-1);
        else alert("There is an error!");
      });
    }
  };
  if (isLoading) return <Spinner loading={isLoading} />;

  return (
    <form onSubmit={submitForm} className={className}>
      <input
        type="text"
        placeholder="What's appointment for?"
        onChange={(e) => {
          setType(e.target.value);
        }}
        minLength={3}
        value={type}
        required
      />
      <input
        type="date"
        onChange={(e) => {
          setDate(e.target.value);
        }}
        value={date}
        min={getTomorrow()}
        max={getNextWeekMax()}
        required
      />
      <select
        onChange={(e) => {
          setTime(e.target.value);
          console.log(time);
        }}
        value={time}
        required
      >
        {data?.map((time, i) => (
          <option key={i}>{time}</option>
        ))}
      </select>

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
