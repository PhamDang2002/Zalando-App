import { Input } from "@mui/material";
import { Fragment } from "react";
import FormField from "./FormField";
import TextInput from "./FormInputs/TextInput";

const Info = ({ control, errors }) => {
  return (
    <Fragment>
      <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
        <FormField
          name="name"
          label="Name"
          control={control}
          Component={TextInput}
          error={errors["name"]}
        />
      </div>
      <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
        <FormField
          name="phone"
          label="Phone"
          control={control}
          type="number"
          Component={TextInput}
          error={errors["phone"]}
        />
      </div>
    </Fragment>
  );
};
export default Info;
