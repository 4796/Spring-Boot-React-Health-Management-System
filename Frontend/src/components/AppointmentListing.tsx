export type AppointmentData = {
  appointmentTime: string;
  doctorId: number;
  id: number;
  patientId: number;
  type: string;
};
const AppointmentListing = ({ data }: { data: AppointmentData }) => {
  return (
    <div className="border-[1px] border-black shadow-xl rounded-md p-4 flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold min-h-[3lh]">
          Appointment for: {data.type}
        </h2>
        <div>
          <div>Time: {data.appointmentTime}</div>
          <div>Doctor: {data.doctorId}</div>
        </div>
      </div>
      <button className="bg-green-600 text-white px-4 py-1 rounded-md">
        Finish
      </button>
      <button className="bg-red-600 text-white px-4 py-1 rounded-md">
        Cancel Appointment
      </button>
    </div>
  );
};

export default AppointmentListing;
