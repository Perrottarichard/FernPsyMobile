# AskFern (Android)

This project is an anonymous forum for people to post questions and comments about sensitive social/psychological topics. Registration is required in order to post and comment, but anyone can view the forum.

This project is the Android app of a companion web app.

The live web app is hosted here:
https://askfern.app

View the server repository here:
https://github.com/Perrottarichard/fern-psy-backend

## Core Technologies

| Technology         | For                      |
| ------------------ | ------------------------ |
| React Native       | UI building              |
| Redux              | state management         |
| React Redux        | React bindings for Redux |
| React Navigation   | routing and navigation   |
| Axios              | data fetching/sending    |
| React Native Paper | styling                  |

## Features

- token authentication / local storage caching
- Dark/light mode is supported and inherited by the user's Android OS display settings
- create, name, and edit avatar (character svgs provided by @bigheads react)
- track and visualize your daily moods with pie and line charts
- the server runs a cron job once daily to prevent gaps in user mood data by adding a default mood if the user hasn't recorded their mood that day
- user activity is scored according to a point system and and achieving higher levels unlocks further avatar customizations
- post to forum anonymously
- comment and reply to posts
- view your pending and answered posts
- flag inappropriate comments for admin review
- "heart" anonymous posts to show support
