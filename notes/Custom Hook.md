#Custom Hook

Custom hooks are a handy way to encapsulate hook-related logic that can be re-used across components when using component composition isn’t really something that will help, make sense, or just "look" semantically right.

Think of a custom hook as a super-powered helper function. According to the rules of hooks, you can't call a hook (like useEffect) in an ordinary helper function that is declared outside of a component. But you can call hooks inside custom hooks!

Additionally, if you have a component in which you have two or more separate pieces of useEffect logic going on, you might want to consider putting them into custom hooks to separate and name them, even if this isn’t logic that will be shared by any other component.

This is much like encapsulating logic into a well-named function for the sake of readability and code organization. After all, it’s a bit tough to read a string of useEffect routines and understand what’s going on. But if, on the other hand, you have one called something like useSyncCustomerRecordStore, then your consumer code is that much more readable.

###Headless Components

It’s not quite a perfect comparison, but in a way, you can think of custom hooks as being a bit like headless components. Mostly because they can call hooks themselves, such as useEffect and useState. These built-in React hooks can work in custom hooks the same way they work in components.

The difference between a custom hook and a component is that a custom hook will return values, not React components or markup. In this way, they’re sort of like component helpers.


###The Shape Of A Custom Hook

Custom hooks are really just:

    •  Functions whose names begin with 'use...'
    •  Functions which can call other hooks

A simple custom hook might look like this:

```
// Custom hook code
function useMyCustomHook(someDataKey) {

    const [someValue, setSomeValue] = useState(null);

    useEffect(() => {
        setSomeValue(useSomeOtherHook(someDataKey));
    }, [someDataKey]);

    return someNewValue;
}

// Consumer component code
function MyAwesomeComponent({someDataKey}) {

    const someValue = useMyCustomHook(someDataKey);

    return (<p>The new value is {someValue}</p>);
}
```
