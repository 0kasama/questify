import Navbar from "@/components/Navbar";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-grow flex items-center justify-center'>
        <RegisterForm />
      </div>
    </div>
  );
}
