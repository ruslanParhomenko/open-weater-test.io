"use client";
import React from "react";
import { useContextValue } from "../../context/context";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { Parameter } from "../../type/data-type";

export default function FormSelect({ parameterDetails }: any) {
  const { selectedParam, setSelectedParam } = useContextValue();

  const handleChange = (event: SelectChangeEvent<Parameter>) => {
    setSelectedParam(event.target.value as Parameter);
  };

  return (
    <FormControl>
      <Select
        labelId="param-select-label"
        id="param-select"
        value={selectedParam}
        onChange={handleChange}
        className="text-foreground"
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          height: "20px",
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 220,
            },
          },
        }}
      >
        {Object.keys(parameterDetails).map((param) => (
          <MenuItem key={param} value={param}>
            {parameterDetails[param as Parameter].unit}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
