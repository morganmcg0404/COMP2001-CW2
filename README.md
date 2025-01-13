# COMP2001-CW2
# Trail Service API

This repository contains the Trail Service API, a FastAPI-based application for managing trail and point records. The API allows you to create, read, update, and delete records in a SQL Server database.

## Project Structure

- `app/`: Contains the main application code.
  - `auth.py`: Handles user authentication.
  - `database.py`: Manages database connections.
  - `main.py`: The entry point of the FastAPI application.
  - `routes.py`: Defines the API routes for managing trails and points.
- `static/`: Contains static files for the web interface.
  - `index.html`
  - `script.js`
  - `style.css`
- `docker-compose.yml`: Docker Compose configuration for running the application.
- `Dockerfile.api`: Dockerfile for building the API service.
- `requirements.txt`: Lists the Python dependencies.

## Requirements

- Docker
- Docker Compose

## Setup and Usage

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/trail-service-api.git
    cd trail-service-api/trail_service
    ```

2. Build and start the Docker containers:
    ```sh
    docker-compose up --build
    ```

3. Access the API at `http://localhost:8000`.

4. Access the web interface at `http://localhost:8000/static`.

## API Endpoints

- `GET /api/{table}`: Retrieve all records from the specified table ([trail](http://_vscodecontentref_/11) or `points`).
- `GET /api/trail/{trail_id}`: Retrieve a specific trail by its ID.
- `POST /api/{table}`: Create a new record in the specified table.
- `PUT /api/{table}/{record_id}`: Update a record in the specified table.
- `DELETE /api/{table}/{record_id}`: Delete a record from the specified table.