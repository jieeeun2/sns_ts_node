import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    name: "test",
    email: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePaths: "p11.jpeg",
    friends: [],
    location: "San Fran, CA",
    occupation: "Software Engineer",
    numberOfVisitorsToday: 14561,
    totalNumberOfVisitors: 888822,
  },
  {
    _id: userIds[1],
    name: "Steve",
    email: "thataaa@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePaths: "p3.jpeg",
    friends: [],
    location: "New York, CA",
    occupation: "Degenerate",
    numberOfVisitorsToday: 14561,
    totalNumberOfVisitors: 888822,
  },
  {
    _id: userIds[2],
    name: "Some",
    email: "someguy@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    imagePaths: "p4.jpeg",
    friends: [],
    location: "Canada, CA",
    occupation: "Data Scientist Hacker",
    numberOfVisitorsToday: 14561,
    totalNumberOfVisitors: 888822,
  },
  {
    _id: userIds[3],
    name: "Whatcha",
    email: "whatchadoing@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePaths: "p6.jpeg",
    friends: [],
    location: "Korea, CA",
    occupation: "Educator",
    numberOfVisitorsToday: 14561,
    totalNumberOfVisitors: 888822,
  },
  {
    _id: userIds[4],
    name: "Jane",
    email: "janedoe@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePaths: "p5.jpeg",
    friends: [],
    location: "Utah, CA",
    occupation: "Hacker",
    numberOfVisitorsToday: 14561,
    totalNumberOfVisitors: 888822,
  },
  {
    _id: userIds[5],
    name: "Harvey",
    email: "harveydunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePaths: "p7.jpeg",
    friends: [],
    location: "Los Angeles, CA",
    occupation: "Journalist",
    numberOfVisitorsToday: 14561,
    totalNumberOfVisitors: 888822,
  },
  {
    _id: userIds[6],
    name: "Carly",
    email: "carlyvowel@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePaths: "p8.jpeg",
    friends: [],
    location: "Chicago, IL",
    occupation: "Nurse",
    numberOfVisitorsToday: 14561,
    totalNumberOfVisitors: 888822,
  },
  {
    _id: userIds[7],
    name: "Jessica",
    email: "jessicadunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePaths: "p9.jpeg",
    friends: [],
    location: "Washington, DC",
    occupation: "A Student",
    numberOfVisitorsToday: 14561,
    totalNumberOfVisitors: 888822,
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    content: "Some really long random content",
    imagePaths: "post1.jpeg",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
    comments: [
      {userId: userIds[0], content: "random comment", isDelete: false},
      {userId: userIds[0], content: "another random comment", isDelete: false},
      {userId: userIds[4], content: "yet another random comment", isDelete: false},
    ],
  },
  /* {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    name: "Whatcha",
    lastName: "Doing",
    location: "Korea, CA",
    content:
      "Another really long random content. This one is longer than the previous one.",
    imagePaths: "post2.jpeg",
    userPicturePath: "p6.jpeg",
    likes: new Map([
      [userIds[7], true],
      [userIds[4], true],
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [
      {userId: userIds[0], content: "one more random comment"},
      {userId: userIds[4], content: "and another random comment"},
      {userId: userIds[4], content: "no more random comments"},
      {userId: userIds[4], content: "I lied, one more random comment"},
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    name: "Jane",
    lastName: "Doe",
    location: "Utah, CA",
    content:
      "This is the last really long random content. This one is longer than the previous one.",
    imagePaths: "post3.jpeg",
    userPicturePath: "p5.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
      [userIds[5], true],
    ]),
    comments: [
      {userId: userIds[0], content: "one more random comment"},
      {userId: userIds[3], content: "I lied, one more random comment"},
      {userId: userIds[5], content: "I lied again, one more random comment"},
      {userId: userIds[3], content: "Why am I doing this?"},
      {userId: userIds[3], content: "I'm bored"},
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    name: "Harvey",
    lastName: "Dunn",
    location: "Los Angeles, CA",
    content:
      "This is the last really long random content. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
    imagePaths: "post4.jpeg",
    userPicturePath: "p7.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
    ]),
    comments: [
      {userId: userIds[0], content: "I lied again, one more random comment"},
      {userId: userIds[1], content: "Why am I doing this?"},
      {userId: userIds[2], content: "I'm bored"},
      {userId: userIds[3], content: "I'm still bored"},
      {userId: userIds[4], content: "All I want to do is play video games"},
      {userId: userIds[5], content: "I'm going to play video games"},
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    name: "Carly",
    lastName: "Vowel",
    location: "Chicago, IL",
    content:
      "Just a short content. I'm tired of typing. I'm going to play video games now.",
    imagePaths: "post5.jpeg",
    userPicturePath: "p8.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[3], true],
      [userIds[5], true],
      [userIds[7], true],
    ]),
    comments: [
      {userId: userIds[3], content: "I lied again, one more random comment"},
      {userId: userIds[3], content: "Why am I doing this?"},
      {userId: userIds[5], content: "Man I'm bored"},
      {userId: userIds[6], content: "What should I do?"},
      {userId: userIds[0], content: "I'm going to play video games"},
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[7],
    name: "Jessica",
    lastName: "Dunn",
    location: "Washington, DC",
    content:
      "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
    imagePaths: "post6.jpeg",
    userPicturePath: "p9.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
    ]),

    comments: [
      {userId: userIds[1], content: "Can I play video games now?"},
      {userId: userIds[1], content: "No let's actually study"},
      {userId: userIds[3], content: "Never mind, I'm going to play video games"},
      {userId: userIds[4], content: "Stop it."},
      {userId: userIds[3], content: "Michael, stop it."},
    ],
  }, */
];