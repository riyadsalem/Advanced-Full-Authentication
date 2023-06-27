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
import SlideButton from "../buttons/SlideButton";
// import { toast } from "react-toastify";

interface IRegisterFormProps {}

const FormSchema = z
  .object({
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
    accept: z.literal(true, {
      errorMap: () => ({
        message:
          "Please agree to all the terms and conditions before continuing.",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
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

        <div className="flex items-center mt-3">
          <input
            type="checkbox"
            id="accept"
            className="mr-2 focus:ring-0 rounded"
            {...register("accept")}
          />
          <label htmlFor="accept" className="text-gray-700">
            I accept the&nbsp;
            <a
              href=""
              className="text-blue-600 hover:text-blue-700 hover:underline"
              target="_blank"
            >
              terms
            </a>
            &nbsp;and&nbsp;
            <a
              href=""
              className="text-blue-600 hover:text-blue-700 hover:underline"
              target="_blank"
            >
              privacy policy
            </a>
          </label>
        </div>
        <div>
          {errors?.accept && (
            <p className="text-sm text-red-600 mt-1">
              {errors?.accept?.message}
            </p>
          )}
        </div>

        <SlideButton
          type="submit"
          text="Sign up"
          slide_text="Secure sign up"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
      {/* <button onClick={() => toast.error("Yaa")}>Toast</button> */}
    </div>
  );
};

export default RegisterForm;
