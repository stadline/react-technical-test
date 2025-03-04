import { useState, useEffect } from "react";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import { useIssue } from "./IssueProvider";
import { useDebounce } from "./useDebounce";
import UsersList from "./UsersList";
import { Divider, Typography } from "@mui/joy";

export default function Sidebar() {
  const { value, setValue } = useIssue();
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setValue(debouncedValue);
  }, [debouncedValue, setValue]);

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: "sticky",
        transition: "transform 0.4s, width 0.4s",
        height: "100dvh",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography level="body-xs" sx={{ color: "text.secondary" }} fontWeight="bold">
        Enter a GitHub issue URL
      </Typography>
      <Input value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
      <Divider />

      <UsersList />
    </Sheet>
  );
}
