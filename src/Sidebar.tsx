import { Button, FormControl, FormLabel } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import { Git } from "react-bootstrap-icons";
import Autocomplete from "@mui/joy/Autocomplete";
import useGetIssues from "./hooks/use-get-issues.hook";
import { useIssueState } from "./context/issue.context";
export default function Sidebar() {
  const issues = useGetIssues();
  const { issue, setIssue } = useIssueState();
  const options = issues.map((issue) => issue?.number.toString());
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
      <FormControl>
        <FormLabel
          sx={(theme) => ({
            "--FormLabel-color": theme.vars.palette.primary.plainColor,
          })}
        >
          MUI Newsletter
        </FormLabel>
        <Autocomplete
          freeSolo={true}
          sx={{ "--Input-decoratorChildHeight": "38px" }}
          defaultValue={issue}
          onChange={(_,newValue) => setIssue(newValue || "")}
          startDecorator={
            <Button
              startDecorator={<Git />}
              variant="solid"
              color="primary"
              type="submit"
              sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            >
              {"Facebook/react/issues"}
            </Button>
          }
          options={options}
        />
      </FormControl>
    </Sheet>
  );
}
