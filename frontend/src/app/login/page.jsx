import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
