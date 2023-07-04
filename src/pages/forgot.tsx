import Background from "@/components/Backgrounds/Background";
import ForgotForm from "@/components/forms/Forgot";

export default function Forgot() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full h-100 flex items-center justify-center">
        {/*--Background--*/}
        <Background image="../../auth/reset.jpg" />

        {/*----Form----*/}
        <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1-3 2xl:w-1/3 h-full bg-white flex flex-col items-center justify-center">
          <ForgotForm />
        </div>
      </div>
    </div>
  );
}
