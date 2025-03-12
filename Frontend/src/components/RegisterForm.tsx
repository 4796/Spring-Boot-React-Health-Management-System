import { FormEvent, useState } from "react";
import { RegisterResponse, Role } from "../services/auth";
import { useNavigate } from "react-router-dom";

export type RegisterArgs = {
  id?: number;
  // used
  username?: string;
  password?: string;
  role?: Role;
  //patient and doctor
  name?: string;
  phone_number?: string;
  phoneNumber?: string;
  //patient
  email?: string;
  medical_history?: string;
  medicalHistory?: string;
  //doctor
  hire_date?: String;
  Salary?: number;
  specialization?: string;
};
const RegisterForm = ({
  sendData,
  className,
}: {
  sendData: (args: RegisterArgs) => Promise<RegisterResponse | null>;
  className?: string;
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [medicalHistory, setMedicalHistory] = useState<string>("");
  const role: Role = "ROLE_PATIENT";
  const navigate = useNavigate();
  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: RegisterArgs = {
      username,
      password,
      role,
      //patient and doctor
      name,
      phone_number: phone,
      //patient
      email,
      medical_history: medicalHistory,
    };
    sendData(data).then((result: RegisterResponse | null) => {
      if (result) {
        if (result.status === "ERROR") console.log("KONFLIKT");
        else navigate("/login");
      } else console.error("REGISTER ERROR.");
    });
  };
  return (
    <form onSubmit={submitForm} className={className}>
      <input
        type="text"
        id="name"
        placeholder="Name"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
      />
      <input
        type="tel"
        id="phone"
        placeholder="+123 4567890"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        required
      />

      <input
        type="email"
        id="email"
        placeholder="user@mail.com"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <input
        type="text"
        id="medical_history"
        placeholder="Medical History"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => setMedicalHistory(e.target.value)}
        value={medicalHistory}
      />
      <input
        type="text"
        id="username"
        placeholder="Username"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        required
      />
      <input
        type="password"
        id="password"
        placeholder="Password"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />

      <button
        type="submit"
        className="bg-sky-600 text-white px-4 py-1 rounded-md"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
