const puzzleInformation =
{
    "name" : "5x4",
    "numLocks" : "2",
    "board" : {
        "rows" : "5",
        "columns" : "4",
        "start" : {
            "x" : "1",
            "y" : "3"
        },
    },
    "squares" : [
      {"label" : "1",
       "location": {
        "x" : "1",
       "y" : "1",
       },
       "mvmt" : "1"
      },
      {"label" : "2",
      "location": {
        "x" : "2",
       "y" : "1",
       },
       "mvmt" : "1" 
      },
      {"label" : "3",
      "location": {
        "x" : "3",
       "y" : "1",
       },
       "key": "red",
       "mvmt" : "1" 
      },
      {"label" : "4",
      "location": {
        "x" : "4",
       "y" : "1",
       },
       "mvmt" : "-1" 
      },
      {"label" : "5",
      "location": {
        "x" : "1",
       "y" : "2",
       },
       "mvmt" : "1" 
      },
      {"label" : "6",
      "location": {
        "x" : "2",
       "y" : "2",
       },
       "mvmt" : "-1" 
      },
      {"label" : "7",
      "location": {
        "x" : "3",
       "y" : "2",
       },
       "mvmt" : "-1" 
      },
      {"label" : "8",
      "location": {
        "x" : "4",
       "y" : "2",
       },
       "mvmt" : "-1" 
      },
      {"label" : "9",
      "location": {
        "x" : "1",
       "y" : "3",
       },
       "mvmt" : "1" 
      },
      {"label" : "10",
      "location": {
        "x" : "2",
       "y" : "3",
       },
       "mvmt" : "1" 
      },
      {"label" : "11",
      "location": {
        "x" : "3",
       "y" : "3",
       },
       "mvmt" : "1" 
      },
      {"label" : "12",
      "location": {
        "x" : "4",
       "y" : "3",
       },
       "lock" : "green",
       "mvmt" : "0" 
      },
      {"label" : "13",
      "location": {
        "x" : "1",
       "y" : "4",
       },
       "mvmt" : "-1" 
      },
      {"label" : "14",
      "location": {
        "x" : "2",
       "y" : "4",
       },
       "mvmt" : "-1" 
      },
      {"label" : "15",
      "location": {
        "x" : "3",
       "y" : "4",
       },
       "mvmt" : "1" 
      },
      {"label" : "16",
      "location": {
        "x" : "4",
       "y" : "4",
       },
       "mvmt" : "-1" 
      },
      {"label" : "17",
      "location": {
        "x" : "1",
       "y" : "5",
       },
       "key":"green",
       "mvmt" : "1" 
      },
      {"label" : "18",
      "location": {
        "x" : "2",
       "y" : "5",
       },
       "lock" : "red",
       "mvmt" : "0" 
      },
      {"label" : "19",
      "location": {
        "x" : "3",
       "y" : "5",
       },
       "mvmt" : "1" 
      },
      {"label" : "20",
      "location": {
        "x" : "4",
       "y" : "5",
       },
       "mvmt" : "-1" 
      },

    ]
};

const puzzle2Information =
{
    "name" : "3x4",
    "numLocks" : "5",
    "board" : {
        "rows" : "3",
        "columns" : "4",
        "start" : {
            "x" : "1",
            "y" : "2"
        },
    },
    "squares" : [
      {
        "label" : "1",
        "mvmt" : "0",
        "lock" : "red",
        "location" : {
          "x" : "1",
          "y" : "1"
        },
      },
      {
        "label" : "2",
        "mvmt" : "0",
        "lock" : "blue",
        "location" : {
          "x" : "2",
          "y" : "1"
        },
      },
      {
        "label" : "3",
        "mvmt" : "1",
        "location" : {
          "x" : "3",
          "y" : "1"
        },
      },
      {
        "label" : "4",
        "mvmt" : "1",
        "key" : "blue",
        "location" : {
          "x" : "4",
          "y" : "1"
        },
      },
      {
        "label" : "5",
        "mvmt" : "1",
        "location" : {
          "x" : "1",
          "y" : "2"
        },
      },
      {
        "label" : "6",
        "mvmt" : "1",
        "key" : "red",
        "location" : {
          "x" : "2",
          "y" : "2"
        },
      },
      {
        "label" : "7",
        "mvmt" : "1",
        "key" : "green",
        "location" : {
          "x" : "3",
          "y" : "2"
        },
      },
      {
        "label" : "8",
        "mvmt" : "0",
        "lock" : "green","location" : {
          "x" : "4",
          "y" : "2"
        },

      },
      {
        "label" : "9",
        "mvmt" : "0",
        "lock" : "green",
        "location" : {
          "x" : "1",
          "y" : "3"
        },
      },
      {
        "label" : "10",
        "mvmt" : "0",
        "lock" : "red",
        "location" : {
          "x" : "2",
          "y" : "3"
        },
      },
      {
        "label" : "11",
        "mvmt" : "1",
        "key" : "red",
        "location" : {
          "x" : "3",
          "y" : "3"
        },
      },
      {
        "label" : "12",
        "mvmt" : "1",
        "key" : "green",
        "location" : {
          "x" : "4",
          "y" : "3"
        },
      }
  
    ]

    
};

const puzzle3Information  = {
  "name" : "2x5",
  "numLocks" : "4",
  "board" : {
    "rows" : "2",
    "columns" : "5",
    "start" : {
        "x" : "1",
        "y" : "1"
    },
  },
  "squares" : [
    {
      "label" : "1",
      "mvmt" : "1",
      "location" : {
        "x" : "1",
        "y" : "1"
      },
    },
    {
      "label" : "2",
      "mvmt" : "1",
      "key" : "red",
      "location" : {
        "x" : "2",
        "y" : "1"
      },
    },
    {
      "label" : "3",
      "mvmt" : "1",
      "key" : "green",
      "location" : {
        "x" : "3",
        "y" : "1"
      },
    },
    {
      "label" : "4",
      "mvmt" : "1",
      "key" : "blue",
      "location" : {
        "x" : "4",
        "y" : "1"
      },
    },
    {
      "label" : "5",
      "mvmt" : "0",
      "lock" : "red",
      "location" : {
        "x" : "5",
        "y" : "1"
      },
    },
    {
      "label" : "6",
      "mvmt" : "-1",
      "location" : {
        "x" : "1",
        "y" : "2"
      },
    },
    {
      "label" : "7",
      "mvmt" : "0",
      "lock" : "yellow",
      "location" : {
        "x" : "2",
        "y" : "2"
      },
    },
    {
      "label" : "8",
      "mvmt" : "0",
      "lock" : "blue",
      "location" : {
        "x" : "3",
        "y" : "2"
      },
    },
    {
      "label" : "9",
      "mvmt" : "0",
      "lock" : "green",
      "location" : {
        "x" : "4",
        "y" : "2"
      },
    },
    {
      "label" : "10",
      "mvmt" : "1",
      "key" : "yellow",
      "location" : {
        "x" : "5",
        "y" : "2"
      },
    },

  ]
};
export { puzzleInformation, puzzle2Information, puzzle3Information};