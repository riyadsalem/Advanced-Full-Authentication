import Link from "next/link";
import { FC, ReactElement } from "react";
import Input from "../inputs/input";
import { CiUser } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IRegisterFormProps {}

const FormSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be atleast 2 characters")
    .max(32, "First name must be less than 32 characters")
    .regex(new RegExp("^[a-zA-z]+$"), "No special characters allowed."),
  last_name: z
    .string()
    .min(2, "Last name must be atleast 2 characters")
    .max(32, "Last name must be less than 32 characters")
    .regex(new RegExp("^[a-zA-z]+$"), "No special characters allowed."),
});

type FormSchemaType = z.infer<typeof FormSchema>;
const RegisterForm: FC<IRegisterFormProps> = (props): ReactElement => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: any) => console.log(data);

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
      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-2 md:flex">
          <Input
            name="first_name"
            label="First name"
            type="text"
            icon={<CiUser />}
            placeholder="example"
            register={register}
            error={errors?.last_name?.message}
            disabled={isSubmitting}
          />
          <Input
            name="last_name"
            label="Last name"
            type="text"
            icon={<CiUser />}
            placeholder="example"
            register={register}
            error={errors?.last_name?.message}
            disabled={isSubmitting}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
