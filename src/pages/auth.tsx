import Background from "./components/Backgrounds/Background";
import RegisterForm from "./components/forms/RegisterForm";

export default function auth() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full h-100 flex items-center justify-center">
        {/* Form */}
        <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1-3 2xl:w-1/3 h-full bg-white flex flex-col items-center justify-center ">
          <RegisterForm />
        </div>
        <Background image={`"../../auth/register.jpg"`} />
      </div>
    </div>
  );
}
