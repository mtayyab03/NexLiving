import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import Chip from "@mui/material/Chip";

interface FilterModalProps {
  columns: string[];
  onClose: () => void;
  onFilter: (filters: {
    columnField: string;
    operatorValue: string;
    value: string;
  }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  columns,
  onClose,
  onFilter,
}) => {
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [conditions, setConditions] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState<Record<string, string>>({});

  const handleColumnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedColumn(event.target.value);
  };

  const handleConditionChange =
    (condition: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setConditions({
        ...conditions,
        [condition]: event.target.checked,
      });
    };
  const handleFilter = (filters: {
    columnField: string;
    operatorValue: string;
    value: string;
  }) => {
    // Update the appliedFilters state in FilterModal component
    setAppliedFilters((prevFilters) => [
      ...prevFilters,
      `${filters.columnField} ${filters.operatorValue} ${filters.value}`,
    ]);
    onFilter(filters); // Pass the selected filter to the parent component
    handleClose();
  };

  const handleValueChange =
    (condition: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [condition]: event.target.value,
      });
    };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here we send all filters at once
    Object.keys(conditions).forEach((condition) => {
      if (conditions[condition] && values[condition]) {
        onFilter({
          columnField: selectedColumn,
          operatorValue: condition,
          value: values[condition],
        });
      }
    });
    onClose();
  };
  const handleRemoveFilter = (filter: string) => {
    // Remove the filter from the appliedFilters state
    setAppliedFilters(appliedFilters.filter((item) => item !== filter));
    // Implement logic to remove filter from data grid if needed
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: "#7ec646", // Green gradient color
        }}
      >
        Apply Filters
      </Typography>
      {appliedFilters.map((filter, index) => (
        <Chip
          key={index}
          label={filter}
          onDelete={() => handleRemoveFilter(filter)}
          sx={{ marginRight: 1, marginBottom: 1 }}
        />
      ))}

      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Select Column</FormLabel>
          <RadioGroup
            aria-label="columns"
            name="columns"
            value={selectedColumn}
            onChange={handleColumnChange}
          >
            {columns.map((column) => (
              <FormControlLabel
                key={column}
                value={column}
                control={<Radio />}
                label={column}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <div
          style={{
            backgroundColor: "#7ec646",
            height: "15rem",
            width: "5px",
            borderRadius: "10px",
            marginBottom: "10px",
            marginRight: "5rem",
          }}
        ></div>

        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Choose Conditions</FormLabel>
          <FormGroup>
            {["equal", "contains", "startwith", "endwith"].map((condition) => (
              <div
                key={condition}
                style={{
                  marginBottom: "10px",
                  display: "flex", // Apply flexbox layout
                  alignItems: "center", // Align items vertically in the center
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={conditions[condition] || false}
                      onChange={handleConditionChange(condition)}
                    />
                  }
                  label={condition.charAt(0).toUpperCase() + condition.slice(1)}
                />
                {conditions[condition] && (
                  <TextField
                    label="Value"
                    value={values[condition] || ""}
                    onChange={handleValueChange(condition)}
                    fullWidth
                    margin="normal"
                  />
                )}
              </div>
            ))}
          </FormGroup>
        </FormControl>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          style={{
            marginRight: "10px",
            color: "grey", // Text color
            borderColor: "grey", // Outline color
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          style={{
            background: "linear-gradient(45deg, #7ec646, #4e8026)", // Green gradient
            color: "white", // Text color
          }}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default FilterModal;
