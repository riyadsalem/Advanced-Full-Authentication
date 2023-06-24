import Link from "next/link";
import { FC, ReactElement } from "react";
import Input from "../inputs/input";
import { CiUser } from "react-icons/ci";

interface IRegisterFormProps {}
const RegisterForm: FC<IRegisterFormProps> = (props): ReactElement => {
  return (
    <div className="w-full px-12 py-4">
      <h2 className="text-center text-2xl font-bold tracking-wider text-gray-800">
        Sign up
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        you already have an account ? &nbsp;
        <Link
          href="/auth"
          className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
          Sign in
        </Link>
      </p>
      <form className="my-8 text-sm">
        <Input
          name="first_name"
          label="First name"
          type="text"
          icon={<CiUser />}
          placeholder="example"
        />
      </form>
    </div>
  );
};

export default RegisterForm;
