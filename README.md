# News-Bot

A news chatbot application built with React, Vite, and TypeScript.

## Features

*   Chat interface for interacting with the news bot.
*   Fetches news from a news API.
*   Uses Tailwind CSS for styling.
*   Uses shadcn/ui for UI components.

## Technologies Used

*   **Frontend:** React, Vite, TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui
*   **HTTP Client:** Axios
*   **State Management:** @tanstack/react-query

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js
*   npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/kanakasudheer/News-Bot.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```

### Running the Application

```sh
npm run dev
```

## Folder Structure

```
/
├── public/
│   └── ...
├── src/
│   ├── assets/
│   │   └── ...
│   ├── components/
│   │   ├── ui/
│   │   │   └── ...
│   │   └── ChatInterface.tsx
│   ├── hooks/
│   │   └── ...
│   ├── lib/
│   │   └── ...
│   ├── pages/
│   │   └── ...
│   ├── services/
│   │   └── newsService.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── index.html
├── package.json
└── ...
```

## Project Details

### Project Purpose and Goals

The "News-Bot" project is a modern, conversational news application. Its main goal is to provide a more engaging and personalized way for users to consume news. Instead of a traditional news feed, users interact with a chatbot interface, choosing from specialized bots for different tasks:

*   **News Summary Bot:** Delivers personalized news summaries based on user interests.
*   **Fact Checker Bot:** Allows users to verify information by checking it against news sources.
*   **Trending Topics Bot:** Helps users discover the latest trending news and topics.

The overall purpose is to create a more interactive, efficient, and user-friendly news experience.

### Architecture and How It Works

The application is built as a single-page application (SPA) using a component-based architecture with React. Here’s how the different parts work together:

1.  **`main.tsx` and `App.tsx` (The Foundation):**
    *   `main.tsx` is the entry point that renders the main `App` component.
    *   `App.tsx` sets up the core application structure. It wraps the entire app in several "providers":
        *   `QueryClientProvider`: Manages data fetching and caching.
        *   `BrowserRouter`: Handles all application routing (e.g., switching between pages).
        *   `TooltipProvider`, `Toaster`, `Sonner`: Provide UI utilities like tooltips and notifications.

2.  **`ChatInterface.tsx` (The User Interface):**
    *   This is the central UI component that the user interacts with.
    *   It's responsible for displaying the bot selection screen, the chat history, and the message input field.
    *   It doesn't contain the chat logic itself; instead, it gets all the data and functions it needs as props from a controlling component.

3.  **`useNewsChat.ts` (The Brains):**
    *   This is a custom React Hook that contains all the core application logic.
    *   It manages the chat's state, including the list of messages, the loading status, and which bot is currently active.
    *   When a user sends a message, this hook intercepts it, determines which bot should respond, and calls the appropriate function in the `newsService`.

4.  **`newsService.ts` (The Data Fetcher):**
    *   This file is responsible for all communication with the external News API.
    *   It uses `axios` to make HTTP requests to fetch news headlines, search for articles, and get trending topics.
    *   It also contains the logic for formatting the raw data from the API into a clean, readable format for the chat.
    *   A key feature here is the inclusion of **mock data**, which allows the application to keep working even if the real API fails.

#### Data Flow Summary:

1.  A user types a message in the `ChatInterface`.
2.  The `ChatInterface` passes the message to the `useNewsChat` hook.
3.  The `useNewsChat` hook adds the user's message to the chat history and calls the `newsService`.
4.  The `newsService` fetches the data from the News API.
5.  The data is returned to the `useNewsChat` hook, which adds the bot's response to the chat history.
6.  The `ChatInterface` updates to display the new message.

### Technologies Explained

*   **React:** The core library for building the user interface with a component-based approach.
*   **Vite:** A modern, extremely fast build tool that speeds up development and bundles the application for production.
*   **TypeScript:** Adds static typing to JavaScript, which helps prevent bugs and makes the code easier to maintain.
*   **Tailwind CSS:** A utility-first CSS framework that allows for rapid and consistent styling without writing a lot of custom CSS.
*   **shadcn/ui:** A collection of reusable and accessible UI components (like buttons, cards, and inputs) built on top of Tailwind CSS. This was chosen to quickly build a polished and professional-looking UI.
*   **Axios:** A popular library for making HTTP requests to external APIs, used here to communicate with the News API.
*   **@tanstack/react-query:** A powerful data-fetching library that simplifies managing server state. It handles caching, background updates, and loading/error states, making the application more robust and responsive.
*   **React Router:** The standard library for handling navigation and routing within a React application.
*   **Lucide React:** A library of clean and simple icons used to improve the visual design of the application.
