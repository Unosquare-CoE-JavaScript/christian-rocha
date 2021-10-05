import { setupServer } from 'msw/node';
import { handlers } from './handlers';
// sets up servers with our predefined handlers in handlers.js
export const server = setupServer(...handlers);



