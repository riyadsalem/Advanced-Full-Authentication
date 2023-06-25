import { FC, ReactElement, useState, useEffect } from "react";
import Link from "next/link";
import Input from "../inputs/input";
import { CiUser } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiMail, FiLock } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import validator from "validator";
import zxcvbn from "zxcvbn";

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
  email: z.string().email("Please enter a valid email adress."),
  phone: z.string().refine(validator.isMobilePhone, {
    message: "Please enter a valid phone number",
  }),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters.")
    .max(52, "Password must be less than 52 characters."),
  confirmPassword: z.string(),
});

type FormSchemaType = z.infer<typeof FormSchema>;
const RegisterForm: FC<IRegisterFormProps> = (props): ReactElement => {
  const [passwordScore, setPasswordScore] = useState<number>(0);
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

  const validatePasswordStrength = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePasswordStrength());
  }, [watch().password]);

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
        </div>
        <Input
          name="email"
          label="Email address"
          type="text"
          icon={<FiMail />}
          placeholder="example@emaple.com"
          register={register}
          error={errors?.email?.message}
          disabled={isSubmitting}
        />
        <Input
          name="phone"
          label="phone number"
          type="text"
          icon={<BsTelephone />}
          placeholder="+(xxx) xxx-xx-xx"
          register={register}
          error={errors?.phone?.message}
          disabled={isSubmitting}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          icon={<FiLock />}
          placeholder="***********"
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
        />

        {watch().password?.length > 0 && (
          <div className="flex mt-2">
            {Array.from(Array(5).keys()).map((span, i) => (
              <span className="w-1/5 px-1" key={i}>
                <div
                  className={`h-2 rounded-xl b ${
                    passwordScore <= 2
                      ? "bg-red-400"
                      : passwordScore < 4
                      ? "bg-yellow-400"
                      : "bg-green-500"
                  }`}
                ></div>
              </span>
            ))}
          </div>
        )}

        <Input
          name="confirmPassword"
          label="Confirm password"
          type="password"
          icon={<FiLock />}
          placeholder="***********"
          register={register}
          error={errors?.confirmPassword?.message}
          disabled={isSubmitting}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;
