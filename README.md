# Instagram Application

This is a social media app where users can upload pictures, share reels, and chat with others in real time.

## Features

- User authentication
- Upload photos and reels
- Real-time chat
- Responsive UI

## Project Structure

```
Client/
Server/
  ├── .env
  ├── .gitignore
  ├── main.js
  ├── package.json
  ├── config/
  ├── controllers/
  ├── middlewares/
  ├── models/
  ├── routes/
  └── utils/
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Setup

1. Clone the repository.
2. Navigate to the `Server` directory.
3. Install dependencies:

    ```sh
    npm install
    ```

4. Create a `.env` file in the `Server` folder and set the port:

    ```
    PORT=5000
    ```

5. Start the server:

    ```sh
    node main.js
    ```

   Or use nodemon for development:

    ```sh
    npx nodemon main.js
    ```

6. The server will run on `http://localhost:5000`.

## Author

Asim Nazir