import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Ensure the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  const newRootElement = document.createElement('div');
  newRootElement.id = 'root';
  newRootElement.style.height = '100%';
  newRootElement.style.width = '100%';
  document.body.appendChild(newRootElement);
}

// Enhanced error logging
window.addEventListener('error', (event) => {
  const errorMessage = `
    Uncaught Error Details:
    - Message: ${event.message}
    - Filename: ${event.filename}
    - Line: ${event.lineno}
    - Column: ${event.colno}
    - Error Object: ${event.error ? event.error.toString() : 'No error object'}
  `;
  console.error(errorMessage);
  
  // Display error in the DOM
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.width = '100%';
  errorDiv.style.backgroundColor = 'red';
  errorDiv.style.color = 'white';
  errorDiv.style.padding = '10px';
  errorDiv.style.zIndex = '1000';
  errorDiv.textContent = errorMessage;
  document.body.appendChild(errorDiv);
});

// Catch unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
  
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.width = '100%';
  errorDiv.style.backgroundColor = 'red';
  errorDiv.style.color = 'white';
  errorDiv.style.padding = '10px';
  errorDiv.style.zIndex = '1000';
  errorDiv.textContent = `Unhandled Promise Rejection: ${event.reason}`;
  document.body.appendChild(errorDiv);
});

// Register the component
AppRegistry.registerComponent(appName, () => App);

// Render the app
try {
  console.log('Attempting to run application');
  AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root')
  });
  console.log('Application run successfully');
} catch (renderError) {
  console.error('Render Application Error:', renderError);
  
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.width = '100%';
  errorDiv.style.backgroundColor = 'red';
  errorDiv.style.color = 'white';
  errorDiv.style.padding = '10px';
  errorDiv.style.zIndex = '1000';
  errorDiv.textContent = `Render Application Error: ${renderError.toString()}`;
  document.body.appendChild(errorDiv);
}
