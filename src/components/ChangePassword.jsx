import { Button } from "@mui/material";
import { useUpdateUserMutation } from "@services/rootApi";

import FormField from "./FormField";
import TextInput from "./FormInputs/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

export default function ChangePassword() {
  const [updateUser] = useUpdateUserMutation();

  const formSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    new_password: yup.string().required("New password is required"),
    confirm_password: yup.string().required("Confirm password is required"),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      password: "",
      new_password: "",
      confirm_password: "",
    },
  });
  const handleChangePassword = (formData) => {
    if (formData.password !== formData.confirm_password) {
      setError("confirm_password", { message: "Mật khẩu không khớp" });
      return;
    }
    updateUser(formData).unwrap();
  };
  return (
    <div className="card mx-auto mt-6 w-full max-w-lg animate-fade-in rounded-3xl bg-white p-4 shadow-large sm:mt-10 sm:p-8 md:p-12">
      <div className="mb-6 border-b border-neutral-100 pb-4 sm:mb-8">
        <h1 className="text-gradient mb-1 text-xl font-bold sm:text-2xl">
          Đổi mật khẩu
        </h1>
        <div className="text-xs text-neutral-500 sm:text-sm">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <form
        className="space-y-4 sm:space-y-6"
        onSubmit={handleSubmit(handleChangePassword)}
      >
        <FormField
          name="password"
          label="Mật khẩu hiện tại"
          control={control}
          type="password"
          Component={TextInput}
          error={errors["password"]}
          inputClassName="input-modern pr-10"
          labelClassName="font-semibold text-neutral-700"
          icon={
            <svg
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m0-6v2m-6 4V7a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2z"
              />
            </svg>
          }
        />
        <FormField
          name="new_password"
          label="Mật khẩu mới"
          control={control}
          type="password"
          Component={TextInput}
          error={errors["new_password"]}
          inputClassName="input-modern pr-10"
          labelClassName="font-semibold text-neutral-700"
          icon={
            <svg
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m0-6v2m-6 4V7a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2z"
              />
            </svg>
          }
        />
        <FormField
          name="confirm_password"
          label="Xác nhận mật khẩu mới"
          control={control}
          type="password"
          Component={TextInput}
          error={errors["confirm_password"]}
          inputClassName="input-modern pr-10"
          labelClassName="font-semibold text-neutral-700"
          icon={
            <svg
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m0-6v2m-6 4V7a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2z"
              />
            </svg>
          }
        />
        <div className="flex justify-end">
          <Button
            variant="contained"
            className="btn-primary rounded-xl px-6 py-2 text-sm shadow-glow sm:px-8 sm:py-3 sm:text-base"
            type="submit"
          >
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </div>
  );
}
