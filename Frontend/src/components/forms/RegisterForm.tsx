import { FormEvent, useState } from "react";
import { RegisterResponse, Role } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import Button from "../reusable/Button";

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
  hire_date?: string;
  hireDate?: string;
  Salary?: number;
  salary?: number;
  specialization?: string;
  imageUrl?: string;
};
const RegisterForm = ({
  sendData,
  className,
  registerDoctor = false,
}: {
  sendData: (args: RegisterArgs) => Promise<RegisterResponse | null>;
  className?: string;
  registerDoctor?: boolean;
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  // patient
  const [email, setEmail] = useState<string>("");
  const [medicalHistory, setMedicalHistory] = useState<string>("");
  // doctor
  const [imageUrl, setImageUrl] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);
  //
  const role: Role = registerDoctor ? "ROLE_DOCTOR" : "ROLE_PATIENT";
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
      email: !registerDoctor ? email : undefined,
      medical_history: !registerDoctor ? medicalHistory : undefined,
      //doctor
      imageUrl: registerDoctor ? imageUrl : undefined,
      specialization: registerDoctor ? specialization : undefined,
      salary: registerDoctor ? salary : undefined,
    };
    sendData(data).then((result: RegisterResponse | null) => {
      if (registerDoctor && salary <= 0) {
        alert("Invalid Salary Number.");
        return;
      }
      if (result) {
        if (result.status === "ERROR") console.log("KONFLIKT");
        else registerDoctor ? navigate(-1) : navigate("/login");
      } else console.error("REGISTER ERROR.");
    });
  };
  return (
    <form onSubmit={submitForm} className={className}>
      <input
        type="text"
        id="name"
        maxLength={30}
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
      {registerDoctor ? (
        <>
          <input
            type="text"
            id="image_url"
            placeholder="www.image.com/imgurl"
            className="w-full border-black border-[1px] rounded-md p-1"
            onChange={(e) => setImageUrl(e.target.value)}
            value={imageUrl}
            required
          />
          <input
            type="text"
            id="specialization"
            placeholder="Neurologist"
            className="w-full border-black border-[1px] rounded-md p-1"
            onChange={(e) => setSpecialization(e.target.value)}
            value={specialization}
            required
          />
          <input
            type="number"
            id="salary"
            placeholder="$1000"
            className="w-full border-black border-[1px] rounded-md p-1"
            onChange={(e) => setSalary(Number(e.target.value))}
            value={salary}
            required
          />
        </>
      ) : (
        <>
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
        </>
      )}
      <input
        minLength={3}
        maxLength={20}
        type="text"
        id="username"
        placeholder="Username"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        required
      />
      <input
        minLength={3}
        type="password"
        id="password"
        placeholder="Password"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      {registerDoctor ? (
        <div className="flex justify-between w-full">
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            style="DANGER"
          >
            Cancel
          </Button>{" "}
          <Button type="submit">Register</Button>
        </div>
      ) : (
        <Button type="submit">Register</Button>
      )}
    </form>
  );
};

export default RegisterForm;
