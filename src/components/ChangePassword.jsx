import { Button, Input } from "@mui/material";
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
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Đổi mật khẩu
        </h1>
        <div className="mt-1 text-sm text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <form
        className="mr-auto mt-8 max-w-2xl"
        onSubmit={handleSubmit(handleChangePassword)}
      >
        <div className="mt-6 flex-grow md:mt-0 md:pr-12">
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <FormField
              name="password"
              label="Password"
              control={control}
              type="password"
              Component={TextInput}
              error={errors["password"]}
            />
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <FormField
              name="new_password"
              label="New Password"
              control={control}
              type="password"
              Component={TextInput}
              error={errors["new_password"]}
            />
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <FormField
              name="confirm_password"
              label="Confirm Password"
              control={control}
              type="password"
              Component={TextInput}
              error={errors["confirm_password"]}
            />
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right" />
            <div className="sm:w-[80%] sm:pl-5">
              <Button
                variant="contained"
                className="flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80"
                type="submit"
                onClick={handleChangePassword}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
