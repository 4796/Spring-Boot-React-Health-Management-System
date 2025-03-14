import { useOutletContext } from "react-router-dom";
import { All } from "../roles/All";
import Button from "./reusable/Button";

export type AppointmentData = {
  appointmentTime: string;
  doctorId: number;
  id: number;
  patientId: number;
  type: string;
};
const AppointmentListing = ({ data }: { data: AppointmentData }) => {
  const globalParams: { user: All } = useOutletContext();
  const isDoctor: boolean = globalParams.user.getRole() === "ROLE_DOCTOR";
  return (
    <div className="border-[1px] border-black shadow-xl rounded-md p-4 flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold min-h-[3lh]">
          Appointment for: {data.type}
        </h1>
        <div>
          {isDoctor ? (
            <div>Patient: {data.patientId}</div>
          ) : (
            <div>Doctor: {data.doctorId}</div>
          )}
          <div>Time: {data.appointmentTime}</div>
        </div>
      </div>
      <Button style="DANGER">Cancel Appointment</Button>
    </div>
  );
};

export default AppointmentListing;
