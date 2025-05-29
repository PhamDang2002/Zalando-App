import { Button } from "@mui/material";

import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { useUpdateUserMutation } from "@services/rootApi";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "./FormInputs/TextInput";
import FormField from "./FormField";
import DateOfBirthInput from "./FormInputs/DateofBird";
import * as yup from "yup";

import { useState } from "react";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useEffect } from "react";

export default function Profile() {
  const [image, setImage] = useState(null);
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
    const month = String(date.getMonth() + 1); // Get the month, add 1 because months are 0-indexed
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

      // Log the values to ensure they're correct
      console.log("Date parts:", day, month, year);

      // Convert the day, month, and year to integers
      const validDay = parseInt(day, 10);
      const validMonth = parseInt(month, 10);
      const validYear = parseInt(year, 10);

      // Pad day and month with leading zeros if needed (e.g., 9 -> 09)
      const paddedMonth = validMonth < 10 ? `0${validMonth}` : validMonth;
      const paddedDay = validDay < 10 ? `0${validDay}` : validDay;

      // Log the padded values
      console.log("Padded Date parts:", paddedDay, paddedMonth, validYear);

      // Check if the day, month, and year are valid
      if (
        validDay >= 1 &&
        validDay <= 31 &&
        validMonth >= 1 &&
        validMonth <= 12 &&
        validYear >= 1900 &&
        validYear <= new Date().getFullYear()
      ) {
        // Create the formatted date string
        const formattedDateString = `${validYear}-${paddedMonth}-${paddedDay}T00:00:00.000Z`;

        // Log the formatted date string
        console.log("Formatted Date String:", formattedDateString);

        const formattedDate = new Date(formattedDateString);

        // Log the result of new Date() for debugging
        console.log("Formatted Date:", formattedDate);

        if (!isNaN(formattedDate.getTime())) {
          formData.date_of_birth = formattedDate.toISOString(); // Convert to ISO string format
        } else {
          console.error("Invalid date constructed.");
          return; // Prevent submission if the date is invalid
        }
      } else {
        console.error("Invalid day, month, or year values.");
        return; // Prevent submission if date parts are invalid
      }
    } else {
      console.error("Incomplete date_of_birth fields.");
      return; // Prevent submission if any date part is missing
    }

    await updateUser(formData).unwrap();
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(openSnackbar({ message: data?.message, type: "success" }));
    }
  }, [data, dispatch, isSuccess, image, updateUser]);
  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Hồ Sơ Của Tôi
        </h1>
        <div className="mt-1 text-sm text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <FormProvider>
        <form
          className="mt-8 flex flex-col-reverse md:flex-row md:items-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mr-3 mt-6 flex-grow md:mt-0">
            <div className="flex flex-col flex-wrap sm:flex-row">
              <FormField
                name="email"
                label="Email"
                control={control}
                Component={TextInput}
                error={errors["email"]}
              />
            </div>
            <Info control={control} errors={errors} />
            <div className="my-6 flex flex-col flex-wrap sm:flex-row">
              <FormField
                name="address"
                label="Address"
                control={control}
                Component={TextInput}
                error={errors["address"]}
              />
            </div>
            <div className="my-6 flex flex-col flex-wrap sm:flex-row">
              <FormField
                name="date_of_birth"
                label="Date of Birth"
                control={control}
                Component={DateOfBirthInput}
                error={errors["date_of_birth"]}
              />
            </div>

            <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right" />
              <div className="sm:w-[80%] sm:pl-5">
                <Button
                  variant="contained"
                  className="flex h-9 items-center rounded-sm bg-primary px-5 text-center text-sm text-white hover:bg-primary/80"
                  type="submit"
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:w-72">
            <div className="flex flex-col items-center">
              <div className="my-5 h-24 w-24">
                {/* {image ? (
                  <img
                    alt="Uploaded"
                    src={image}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full rounded-full bg-gray-300" />
                )} */}
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
