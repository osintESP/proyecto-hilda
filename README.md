# ReHabilita

ReHabilita is a cognitive rehabilitation web application designed to assist users with various exercises including movement, memory, language, and tracing.

## Project Structure

- `index.html`: The main application file.
- `Dockerfile`: Configuration for building the Docker image.
- `docker-compose.yml`: Configuration for running the application locally with Docker Compose.
- `k8s/`: Kubernetes manifests for deployment.

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Kubernetes (optional, for deployment)

### Running Locally

1. Build and run the container:
   ```bash
   docker-compose up -d
   ```
2. Open your browser and navigate to `http://localhost:8080`.

### Deployment to Kubernetes

1. Apply the manifests:
   ```bash
   kubectl apply -f k8s/
   ```
2. The application will be available at `http://rehabilita.local` (ensure you have an Ingress Controller and your `/etc/hosts` is configured).
