import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { Alert, Button } from "@mui/material";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useRegisterMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const RegisterPage = () => {
  const [register, { data, isLoading, isError, error, isSuccess }] =
    useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is invalid"),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
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
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const onSubmit = (formData) => {
    if (formData.password !== formData.confirm_password) {
      setError("confirm_password", { message: "Mật khẩu không khớp" });
      return;
    }

    // Nếu khớp, tiếp tục gửi dữ liệu đăng ký
    register(formData);
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message, type: "success" }));
      navigate("/login");
      return;
    }
  }, [isSuccess, data, dispatch, navigate]);
  console.log(errors);
  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Register</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
          error={errors["email"]}
        />
        <FormField
          name="password"
          label="Password"
          control={control}
          type="password"
          Component={TextInput}
          error={errors["password"]}
        />
        <FormField
          name="confirm_password"
          label="Confirm Password"
          control={control}
          type="password"
          Component={TextInput}
          error={errors["confirm_password"]}
        />

        <Button variant="contained" type="submit" disabled={isLoading}>
          Sign up
        </Button>
        {isError && <Alert severity="error">{error?.data?.data.email}</Alert>}
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link className="text-[#F87171]" to="/login">
          Sign in instead
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
