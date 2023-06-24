interface InputProps {
  name: string;
  label: string;
  type: string;
  icon: JSX.Element;
  placeholder: string;
}
const Input: React.FunctionComponent<InputProps> = (
  props
): React.ReactElement => {
  const { name, label, type, icon, placeholder } = props;
  return (
    <div className="mt-3 w-[100%]">
      <label htmlFor={name} className="text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md">
        <div className="pointer-event-none absolute left-0 top-0.5 inset-y-0 flex items-center pl-3">
          <span className="text-gray-500 text-sm">{icon}</span>
        </div>
        <input
          type={type}
          className="w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-blue-700 focus:ring-2 text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
