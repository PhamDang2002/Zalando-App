import { useDetectLayout } from "@hooks/index";
import { TextField } from "@mui/material";

const TextInput = ({ onChange, value, name, type = "text", error }) => {
  const { isMediumLayout } = useDetectLayout();
  return (
    <TextField
      fullWidth
      slotProps={{
        input: {
          className: ` h-10 px-5 py-2  !w-[100%] "} `,
        },
        htmlInput: { className: "!p-0 " },
      }}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      error={error}
    />
  );
};
export default TextInput;
