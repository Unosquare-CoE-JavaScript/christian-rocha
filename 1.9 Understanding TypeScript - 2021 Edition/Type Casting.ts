
/**
  Type castings allow you to convert a variable from one type to another.
  In TypeScript, you can use the as keyword or <> operator for type castings.
 */

// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
const userInputElement = document.getElementById('user-input') as HTMLInputElement;

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi there!';
}