import { TextField, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const DateOfBirthInput = ({ control, name, error }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );

  return (
    <div className="flex !w-[300px] gap-2">
      <Controller
        name={`${name}.day`}
        control={control}
        defaultValue="" // Ensure initial value is set to prevent uncontrolled to controlled switch
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Day"
            variant="outlined"
            fullWidth
            size="small"
            error={!!error}
            helperText={error?.day ? error.day.message : ""}
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name={`${name}.month`}
        control={control}
        defaultValue="" // Ensure initial value is set to prevent uncontrolled to controlled switch
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Month"
            variant="outlined"
            fullWidth
            size="small"
            error={!!error}
            helperText={error?.month ? error.month.message : ""}
          >
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name={`${name}.year`}
        control={control}
        defaultValue="" // Ensure initial value is set to prevent uncontrolled to controlled switch
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Year"
            variant="outlined"
            fullWidth
            size="small"
            error={!!error}
            helperText={error?.year ? error.year.message : ""}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </div>
  );
};

export default DateOfBirthInput;
