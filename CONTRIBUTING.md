# Contributing to Great Indian Waffle

Thank you for considering contributing to the Great Indian Waffle app! This document outlines the process for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and considerate of others when contributing.

## How to Contribute

### Reporting Bugs

If you find a bug in the application, please create an issue in the repository with the following information:

1. A clear, descriptive title
2. Steps to reproduce the bug
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)
6. Environment details (OS, device, app version)

### Suggesting Features

We welcome feature suggestions! To suggest a new feature, create an issue with:

1. A clear, descriptive title
2. Detailed description of the proposed feature
3. Any relevant mockups or examples
4. Explanation of why this feature would be beneficial

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests to ensure your changes don't break existing functionality
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature-name`)
7. Create a new Pull Request

## Development Setup

### Frontend (React Native)

1. Navigate to the frontend directory:
   ```bash
   cd frontend/GreatIndianWaffle
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   - For iOS: `npx react-native run-ios`
   - For Android: `npx react-native run-android`
   - For Web: `npm run web`

### Backend (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

## Coding Standards

### Frontend

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use functional components with hooks instead of class components
- Keep components small and focused on a single responsibility
- Use the provided UI components for consistent design

### Backend

- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide
- Write docstrings for all functions and classes
- Use type hints where applicable
- Write unit tests for new functionality

## Testing

- Write unit tests for all new features
- Ensure all tests pass before submitting a pull request
- Test on multiple devices/platforms if possible

## License

By contributing to this project, you agree that your contributions will be licensed under the project's MIT License.
