import { useForm } from "react-hook-form";
import FormField from "../../components/FormField";
import TextInput from "../../components/FormInputs/TextInput";
import { Alert, Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "../../services/rootApi";
import { useEffect } from "react";
import { openSnackbar } from "../../redux/slices/snackbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { login as loginAction } from "../../redux/slices/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, data = {}, error, isSuccess, isError }] =
    useLoginMutation();
  const preventLogin = useSelector((store) => store?.auth?.access_token);
  console.log(preventLogin);
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email")
      .email("Enter a valid email")
      .required("Vui lòng nhập email"),
    password: yup
      .string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Vui lòng nhập mật khẩu"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formData) => {
    login(formData);
  };

  useEffect(() => {
    if (isError) {
      dispatch(
        openSnackbar({ type: "error", message: error.data.data.password }),
      );
    }
    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message }));

      // Kiểm tra data.data và đảm bảo là plain object
      if (data && data.data) {
        const loginData = {
          access_token: data.data.access_token,
          refresh_token: data.data.refresh_token,
          userInfo: data.data.user,
        };

        // Dispatch login action từ slice

        dispatch(loginAction(loginData)); // dispatch chính xác login action
      }

      navigate("/", {
        email: getValues("email"),
      });
    }
  }, [isError, error, dispatch, navigate, isSuccess, data, getValues]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Login</p>
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
        <Button variant="contained" type="submit">
          {isLoading && <CircularProgress size={20} className="mr-1" />}
          Sign in
        </Button>
        {isError && <Alert severity="error">{error?.data?.data.email}</Alert>}
      </form>
      <p className="mt-4">
        New on our platform?{" "}
        <Link className="text-primary" to="/register">
          Create an account
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
