import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPagination,
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
} from "@mui/x-data-grid";
import "../../styles/components/dashboard/Grid.css";
import FilterModal from "./FilterModal";
import { GridFilterItem } from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import Chip from "@mui/material/Chip";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  GetApp as ExportIcon,
} from "@mui/icons-material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { TablePaginationProps } from "@mui/material/TablePagination";

interface Row {
  id: number;
  lastName: string;
  firstName: string;
  age: string | number;
  user: number;
  title: string;
  code: number;
  unit: number;
  status: string;
  buildings: string;
  people: string;
  devices: string;
}
interface IndexedRow {
  [key: string]: string | number;
}

interface FilterItem {
  columnField: string;
  operatorValue: string;
  value: string | number;
}
const CustomSearchField: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
const columns: GridColDef[] = [
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "user",
    headerName: "User",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
    editable: true,
  },
  {
    field: "unit",
    headerName: "Unit",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "code",
    headerName: "Code",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: true,
  },
  {
    field: "people",
    headerName: "People",
    width: 150,
    editable: true,
  },
  {
    field: "devices",
    headerName: "Devices",
    width: 150,
    editable: true,
  },
  {
    field: "buildings",
    headerName: "Buildings",
    width: 150,
    editable: true,
  },
];

const rows: Row[] = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: "14",
    user: 256,
    title: "HRM",
    unit: 11,
    code: 243,
    status: "Active",
    people: "Amore",
    devices: "Active",
    buildings: "Al burj",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: "31",
    user: 2,
    title: "HRM",
    unit: 11,
    code: 243,
    status: "Active",
    people: "almul",
    devices: "Active",
    buildings: "Al burj",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: "31",
    user: 23,
    title: "HRM",
    unit: 11,
    code: 243,
    status: "Active",
    people: "zar",
    devices: "Active",
    buildings: "Al burj",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: "11",
    user: 26,
    title: "HRM",
    unit: 11,
    code: 243,
    status: "Active",
    people: "lipid",
    devices: "Active",
    buildings: "Al burj",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: "",
    user: 56,
    title: "HRM",
    unit: 11,
    code: 243,
    status: "Active",
    people: "renz",
    devices: "Active",
    buildings: "Al burj",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: "",
    age: "150",
    user: 6,
    title: "HRM",
    unit: 11,
    code: 243,
    status: "Active",
    people: "amul",
    devices: "Active",
    buildings: "Al burj",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: "44",
    user: 46,
    title: "HRM",
    unit: 11,
    code: 243,
    status: "Active",
    people: "den",
    devices: "Active",
    buildings: "Al burj",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: "36",
    user: 256,
    title: "HRM",
    unit: 11,
    code: 243,
    status: "Active",
    people: "pan",
    devices: "Active",
    buildings: "Al burj",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: "65",
    user: 98,
    title: "HRM",
    unit: 11,
    code: 243,
    status: "Active",
    people: "uruf",
    devices: "Active",
    buildings: "Al burj",
  },
];

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      sx={{
        "& .MuiPaginationItem-root": {
          color: "#4e8026", // Text color
        },
        "& .MuiPaginationItem-page.Mui-selected": {
          backgroundColor: "#7ec646", // Background color for selected page
          color: "white", // Text color for selected page
        },
        "& .MuiPaginationItem-page:hover": {
          backgroundColor: "#7ec646", // Hover color
          color: "white", // Text color on hover
        },
        "& .MuiPaginationItem-ellipsis": {
          color: "#4e8026", // Ellipsis color
        },
      }}
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
      showFirstButton
      showLastButton
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const Grid: React.FC = () => {
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.field)
  );

  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<GridFilterModel>({
    items: [],
  });
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columnOrder); // State to keep track of visible columns
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownColumnOrder, setDropdownColumnOrder] =
    useState<string[]>(columnOrder);
  const [filteredRows, setFilteredRows] = useState<Row[]>(rows);

  const [columnSearchValues, setColumnSearchValues] = useState<{
    [key: string]: string;
  }>(
    columns.reduce((acc, column) => {
      acc[column.field] = "";
      return acc;
    }, {} as { [key: string]: string })
  );

  const [page, setPage] = useState(0);
  const pageSize = 5;
  const columnsWithSearch: GridColDef[] = columns.map((column) => ({
    ...column,
    renderHeader: (params) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{params.colDef.headerName}</span>
        <input
          type="text"
          placeholder={`Search ${params.colDef.headerName}`}
          value={columnSearchValues[column.field]}
          onChange={(e) =>
            handleColumnSearchChange(column.field, e.target.value)
          }
          style={{
            marginTop: "5px",
            padding: "2px 5px",
            fontSize: "0.8rem",
          }}
        />
      </div>
    ),
  }));

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const paginatedRows = filteredRows.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  const handleColumnSearchChange = (field: string, value: string) => {
    setColumnSearchValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));

    const newFilteredRows = rows.filter((row) => {
      if (!isIndexedRow(row)) return false; // If the row is not an IndexedRow, skip filtering
      return Object.keys(columnSearchValues).every((colField) => {
        const searchValue =
          colField === field ? value : columnSearchValues[colField];
        return (
          searchValue === "" ||
          String(row[colField])
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      });
    });

    setFilteredRows(newFilteredRows);
  };
  function isIndexedRow(obj: any): obj is IndexedRow {
    // Check if the object has string or number keys
    return Object.keys(obj).every(
      (key) => typeof obj[key] === "string" || typeof obj[key] === "number"
    );
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (result.type === "column") {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(
        destinationIndex,
        0,
        newColumnOrder.splice(sourceIndex, 1)[0]
      );
      setColumnOrder(newColumnOrder);

      const newVisibleColumns = Array.from(visibleColumns);
      newVisibleColumns.splice(
        destinationIndex,
        0,
        newVisibleColumns.splice(sourceIndex, 1)[0]
      );
      setVisibleColumns(newVisibleColumns);
    }
  };

  const handleAddColumn = (column: GridColDef) => {
    const newVisibleColumns = [...visibleColumns, column.field];
    setVisibleColumns(newVisibleColumns);
  };

  const handleRemoveColumn = (column: GridColDef) => {
    const newVisibleColumns = visibleColumns.filter(
      (col) => col !== column.field
    );
    setVisibleColumns(newVisibleColumns);
  };
  const handleSearch = () => {
    // Implement your search logic here
    console.log("Searching for:", searchValue);
  };

  const columnNames = columns.map((column) => column.field);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilter = (filters: {
    columnField: string;
    operatorValue: string;
    value: string;
  }) => {
    setAppliedFilters((prevFilters) => [
      ...prevFilters,
      `${filters.columnField} ${filters.operatorValue} ${filters.value}`,
    ]);
    // Apply filters to the data grid if needed

    setFilterValues({
      items: [
        {
          field: filters.columnField,
          operator: "contains", // You may need to adjust this based on your filtering logic
          value: filters.value,
        } as GridFilterItem,
      ], // Assert the type to GridFilterItem
    });
    handleClose();
  };
  const handleRemoveFilter = (filter: string) => {
    // Remove the filter from the appliedFilters state
    setAppliedFilters((prevFilters) =>
      prevFilters.filter((item) => item !== filter)
    );
    // Remove the filter from the filterValues state
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      items: prevFilterValues.items.filter(
        (item) => item.field !== filter.split(" ")[0]
      ), // Assuming the filter format is "columnField operatorValue value"
    }));
  };

  return (
    <Box style={{ height: 400, width: "100%" }}>
      <div className="maingrid-Header">
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          {appliedFilters.map((filter, index) => (
            <Chip
              key={index}
              label={filter}
              onDelete={() => handleRemoveFilter(filter)}
              sx={{
                marginTop: "2px",
                marginRight: 1,
                borderColor: "#7ec646", // Green border color
                borderWidth: "2px", // Border width
                borderStyle: "solid",
                color: "#333",
              }}
            />
          ))}

          {/* Filter Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            style={{
              background: "linear-gradient(45deg, #7ec646, #4e8026)", // Green color gradient
              color: "white", // Text color
              marginRight: "10px", // Add some spacing between the Filter button and the search field
            }}
          >
            Filter
          </Button>

          {/* Search field */}

          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                width: "15rem",
                padding: "10px 40px 10px 20px", // Adjust padding as needed to accommodate the icon
                borderRadius: "20px", // Border radius
                border: "2px solid", // Set initial border as transparent
                borderColor: "#7ec646", // Gradient background
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "60%",
                right: "10px",
                transform: "translateY(-50%)",
              }}
            >
              <SearchIcon style={{ color: "#7ec646" }} />
            </div>
          </div>

          <div className="iconTextRow">
            <ExportIcon className="icon-export" /> {/* Icon */}
            Export {/* Text */}
          </div>

          <div className="navbar-item-fixed">
            <MenuIcon
              className="navbar-icon"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="columns" type="column">
                  {(provided) => (
                    <div
                      className="dropdown-menu"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="text"
                        placeholder="Search"
                        // Add your search functionality here
                      />
                      {dropdownColumnOrder.map((columnId, index) => {
                        const column = columns.find(
                          (col) => col.field === columnId
                        );
                        const isChecked = visibleColumns.includes(columnId); // Check if the column is visible
                        return (
                          <Draggable
                            key={columnId}
                            draggableId={columnId}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="checkbox-container"
                              >
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={isChecked} // Set the checked state based on visibility
                                    onChange={() => {
                                      if (isChecked) {
                                        handleRemoveColumn(
                                          column as GridColDef
                                        );
                                      } else {
                                        handleAddColumn(column as GridColDef);
                                      }
                                    }}
                                    style={{ marginRight: "5px" }}
                                  />
                                  <DragIndicatorIcon
                                    className="move-icon"
                                    style={{
                                      fontSize: "16px",
                                      paddingTop: "3px",
                                    }}
                                  />
                                  {column?.headerName}
                                </label>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </div>
      </div>
      <div className="maingrid-Header-dowButtons">
        <Button
          variant="contained"
          color="primary"
          style={{
            background: "linear-gradient(45deg, #7ec646, #4e8026)", // Green color gradient
            color: "white", // Text color
            marginLeft: "10px", // Add some spacing between the Filter button and the search field
          }}
        >
          Actions
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            background: "linear-gradient(45deg, #7ec646, #4e8026)", // Green color gradient
            color: "white", // Text color
            marginRight: "10px", // Add some spacing between the Filter button and the search field
          }}
        >
          + Add Rows
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "#fff",
            border: "2px solid", // Border will be added dynamically via theme
            borderColor: "#7ec646", // Green gradient border color
            borderRadius: 5, // Border radius
            boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.5)", // Corrected boxShadow
            p: 4,
          }}
        >
          <FilterModal
            columns={columnNames}
            onFilter={(filter) => handleFilter(filter)}
            onClose={handleClose}
          />
        </Box>
      </Modal>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          marginBottom: "10px",
        }}
      >
        {columnsWithSearch.map((column) => (
          <div key={column.field} style={{ marginRight: "10px" }}>
            <input
              type="text"
              placeholder={`Search ${column.headerName}`}
              value={columnSearchValues[column.field]}
              onChange={(e) =>
                handleColumnSearchChange(column.field, e.target.value)
              }
              style={{
                fontSize: "11px",
                padding: "5px 4px",
                borderRadius: "20px",
                border: "2px solid #7ec646", // Use consistent border color
              }}
            />
          </div>
        ))}
      </div>
      <DataGrid
        rows={filteredRows.slice(page * pageSize, (page + 1) * pageSize)}
        columns={columnsWithSearch
          .filter((column) => visibleColumns.includes(column.field))
          .sort(
            (a, b) =>
              visibleColumns.indexOf(a.field) - visibleColumns.indexOf(b.field)
          )}
        pageSizeOptions={[5, 10, 25, 50]}
        rowCount={rows.length}
        checkboxSelection
        disableRowSelectionOnClick
        className="custom-header"
        filterModel={filterValues}
        paginationMode="client"
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(params) => {
          setPage(params.page);
        }}
        slots={{
          pagination: CustomPagination,
        }}
        sx={{
          "& .MuiTablePagination-root": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "& .MuiToolbar-root": {
              display: "flex",
              alignItems: "center",
              gap: "20px", // Adjust the gap value as needed
            },
          },
          "& .MuiTablePagination-select": {
            backgroundColor: "#7ec646",
            color: "white",
            borderRadius: "4px",
            "&:focus": {
              backgroundColor: "#7ec646",
              color: "white",
              borderRadius: "4px",
            },
          },
        }}
      />
    </Box>
  );
};

export default Grid;
