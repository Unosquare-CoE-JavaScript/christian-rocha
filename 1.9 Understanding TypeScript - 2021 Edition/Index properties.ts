/**
 * With the [prop: string]: string, we can set any set of properties to the ErrorContainer, but they must be always an string.
 */
interface ErrorContainer { 
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!'
};