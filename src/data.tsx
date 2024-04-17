export const users = [
  {
    name: "Alexandre Paixao",
    username: "@alex-pex",
    avatar: "https://avatars.githubusercontent.com/u/368155?s=80&v=4",
  },
  {
    name: "Javier Gonzalez",
    username: "@xaviergonz",
    avatar: "https://avatars.githubusercontent.com/u/6306796?s=80&v=4",
  },
];

export const chat = {
  id: "1",
  sender: users[0],
  messages: [
    {
      id: "1",
      content: "Hi Olivia, I am currently working on the project.",
      timestamp: "Wednesday 9:00am",
      sender: users[0],
    },
    {
      id: "2",
      content: "That sounds great, Mabel! Keep up the good work.",
      timestamp: "Wednesday 9:10am",
      sender: users[1],
    },
    {
      id: "3",
      timestamp: "Wednesday 11:30am",
      sender: users[0],
      content: "I will send the draft by end of the day.",
    },
    {
      id: "4",
      timestamp: "Wednesday 2:00pm",
      sender: users[1],
      content: "Sure, I will be waiting for it.",
    },
    {
      id: "5",
      timestamp: "Wednesday 4:30pm",
      sender: users[0],
      content: "Just a heads up, I am about to send the draft.",
    },
    {
      id: "6",
      content: "Thanks Olivia! Almost there. I'll work on making those changes you suggested and will shoot it over.",
      timestamp: "Thursday 10:16am",
      sender: users[0],
    },
  ],
};
