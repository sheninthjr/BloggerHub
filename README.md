# BloggerHub

BloggerHub is a feature-rich web application that empowers users to connect, share content, and engage in real-time conversations. Built on a robust tech stack including Next.js, GraphQL, WebSocket, Tailwind CSS, and Recoil, BloggerHub offers a seamless and modern experience for bloggers and content enthusiasts.

![Alt text](/sample.png)

## Features
### Real-Time Chatting
Connect with your friends and followers in real-time through our intuitive chat feature. Stay engaged and build a community around your content.

### Content Posting
Share your thoughts, ideas, and creations with the world effortlessly. The content posting section allows you to create, edit, and publish your articles seamlessly.

### User-Friendly Interface
BloggerHub boasts a clean and user-friendly interface, making it easy for both beginners and experienced bloggers to navigate the platform with ease.

### Friends Management
Effortlessly manage your network of friends and followers. Stay connected with those who matter most and build meaningful relationships within the BloggerHub community.

### Tech Stack
#### Next.js: 
Utilizing the power of React and server-side rendering for a fast and efficient web experience.
#### GraphQL: 
A flexible and efficient query language for APIs, providing a robust and seamless data fetching mechanism.
#### WebSocket: 
Enabling real-time communication, allowing users to chat instantly and stay connected in real-time.
#### Tailwind CSS: 
A utility-first CSS framework that makes styling a breeze, ensuring a visually appealing and responsive design.
#### Recoil: 
A state management library for React applications, providing a simple and efficient way to manage the application's state.

## Local Development

### Run the command to execute the local DataBase

```sh
sudo docker-compose up
```

### Frontend

```sh
cd apps/web
```
#### Copy the env.local to env

```sh
cp .env.local .env
```

#### Install the Dependencies
```sh
yarn install
```
#### Run
```sh
yarn dev
```

### Backend 

```sh
cd packages/backend
```
#### Run following commands to install the dependencies and Prisma.

```sh
yarn install
```

```sh
yarn prisma migrate dev
```

```sh
yarn prisma generate
```

```sh
yarn build
```

```sh
yarn start
```
