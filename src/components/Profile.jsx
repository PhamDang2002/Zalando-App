import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "@services/rootApi";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "./FormInputs/TextInput";
import FormField from "./FormField";
import DateOfBirthInput from "./FormInputs/DateofBird";
import * as yup from "yup";
import { useEffect } from "react";
import { openSnackbar } from "@redux/slices/snackbarSlice";

export default function Profile() {
  const profile = useSelector((state) => state.auth.userInfo);
  const [updateUser, { data, isSuccess }] = useUpdateUserMutation();

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    address: yup.string().required("Address is required"),
    date_of_birth: yup.object({
      day: yup.string().required("Day is required"),
      month: yup.string().required("Month is required"),
      year: yup.string().required("Year is required"),
    }),
  });

  const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth) return { day: "", month: "", year: "" };
    const date = new Date(dateOfBirth);
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = date.getFullYear().toString();
    return { day, month, year };
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: profile?.name,
      phone: profile?.phone,
      address: profile?.address,
      date_of_birth: parseDateOfBirth(profile?.date_of_birth),
      email: profile?.email,
      avatar: profile?.avatar || "",
    },
  });
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    if (
      formData.date_of_birth &&
      formData.date_of_birth.day &&
      formData.date_of_birth.month &&
      formData.date_of_birth.year
    ) {
      const { day, month, year } = formData.date_of_birth;
      const validDay = parseInt(day, 10);
      const validMonth = parseInt(month, 10);
      const validYear = parseInt(year, 10);
      const paddedMonth = validMonth < 10 ? `0${validMonth}` : validMonth;
      const paddedDay = validDay < 10 ? `0${validDay}` : validDay;
      if (
        validDay >= 1 &&
        validDay <= 31 &&
        validMonth >= 1 &&
        validMonth <= 12 &&
        validYear >= 1900 &&
        validYear <= new Date().getFullYear()
      ) {
        const formattedDateString = `${validYear}-${paddedMonth}-${paddedDay}T00:00:00.000Z`;
        const formattedDate = new Date(formattedDateString);
        if (!isNaN(formattedDate.getTime())) {
          formData.date_of_birth = formattedDate.toISOString();
        } else {
          return;
        }
      } else {
        return;
      }
    } else {
      return;
    }
    await updateUser(formData).unwrap();
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(openSnackbar({ message: data?.message, type: "success" }));
    }
  }, [data, dispatch, isSuccess, updateUser]);
  return (
    <div className="card mx-auto mt-6 w-full max-w-2xl animate-fade-in rounded-3xl bg-white p-4 shadow-large sm:mt-10 sm:p-8 md:p-12">
      <div className="flex flex-col gap-8 md:flex-row md:gap-10">
        {/* Avatar Section */}
        <div className="flex flex-col items-center md:w-1/3">
          <div className="relative mb-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary p-1 shadow-glow sm:h-32 sm:w-32">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
                {profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Avatar"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-brand-50 text-2xl font-bold text-brand-600 sm:text-4xl">
                    {profile?.name?.[0]?.toUpperCase() ||
                      profile?.email?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="text-base font-semibold text-neutral-800 sm:text-lg">
              {profile?.name}
            </div>
            <div className="text-xs text-neutral-500 sm:text-sm">
              {profile?.email}
            </div>
          </div>
        </div>
        {/* Form Section */}
        <div className="w-full flex-1">
          <div className="mb-6 border-b border-neutral-100 pb-4 sm:mb-8">
            <h1 className="text-gradient mb-1 text-xl font-bold sm:text-2xl">
              Hồ Sơ Của Tôi
            </h1>
            <div className="text-xs text-neutral-500 sm:text-sm">
              Quản lý thông tin hồ sơ để bảo mật tài khoản
            </div>
          </div>
          <FormProvider>
            <form
              className="space-y-4 sm:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <FormField
                  name="email"
                  label="Email"
                  control={control}
                  Component={TextInput}
                  error={errors["email"]}
                  inputClassName="input-modern"
                  labelClassName="font-semibold text-neutral-700"
                  disabled
                />
                <FormField
                  name="name"
                  label="Họ và tên"
                  control={control}
                  Component={TextInput}
                  error={errors["name"]}
                  inputClassName="input-modern"
                  labelClassName="font-semibold text-neutral-700"
                />
                <FormField
                  name="phone"
                  label="Số điện thoại"
                  control={control}
                  Component={TextInput}
                  error={errors["phone"]}
                  inputClassName="input-modern"
                  labelClassName="font-semibold text-neutral-700"
                />
                <FormField
                  name="address"
                  label="Địa chỉ"
                  control={control}
                  Component={TextInput}
                  error={errors["address"]}
                  inputClassName="input-modern"
                  labelClassName="font-semibold text-neutral-700"
                />
                <FormField
                  name="date_of_birth"
                  label="Ngày sinh"
                  control={control}
                  Component={DateOfBirthInput}
                  error={errors["date_of_birth"]}
                  inputClassName="input-modern"
                  labelClassName="font-semibold text-neutral-700"
                />
              </div>
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
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
