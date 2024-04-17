import { Avatar } from "@mui/joy";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

type ChatBubbleProps = {
  content: string;
  variant: "solid" | "outlined";
  timestamp: string;
  sender: {
    name: string;
    avatar: string;
  };
};

export default function ChatBubble({ content, variant, timestamp, sender }: ChatBubbleProps) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar size="sm" variant="solid" src={sender.avatar} />
      <Box sx={{ maxWidth: "60%", minWidth: "auto" }}>
        <Stack direction="row" spacing={2} sx={{ mb: 0.25 }}>
          <Typography level="body-xs" fontWeight="bold">
            {sender.name}
          </Typography>
          <Typography level="body-xs">{timestamp}</Typography>
        </Stack>
        <Box>
          <Sheet
            color="primary"
            variant={variant}
            invertedColors={variant === "solid"}
            sx={{
              p: 1.25,
              borderRadius: "lg",
              borderTopLeftRadius: 0,
            }}
          >
            <Typography level="body-sm" color="primary">
              {content}
            </Typography>
          </Sheet>
        </Box>
      </Box>
    </Stack>
  );
}
