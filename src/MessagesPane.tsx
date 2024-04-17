import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { chat } from "./data";
import ChatBubble from "./ChatBubble";

export default function MessagesPane() {
  const chatMessages = chat.messages;

  return (
    <Sheet
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.body",
        }}
        py={{ xs: 2, md: 2 }}
        px={{ xs: 1, md: 2 }}
      >
        <Typography
          fontWeight="lg"
          fontSize="lg"
          component="h2"
          noWrap
          endDecorator={
            <Chip
              variant="outlined"
              size="sm"
              color="neutral"
              sx={{
                borderRadius: "sm",
              }}
            >
              #1234
            </Chip>
          }
        >
          [eslint-plugin-react-hooks] Add whitelist for functions that are not to be considered as callbacks
        </Typography>
        <Typography level="body-sm">{chat.sender.username}</Typography>
      </Stack>
      <Stack spacing={2} justifyContent="flex-end" px={2} py={3}>
        {chatMessages.map((message, index) => (
          <ChatBubble key={index} variant={message.sender === chat.sender ? "solid" : "outlined"} {...message} />
        ))}
      </Stack>
    </Sheet>
  );
}
