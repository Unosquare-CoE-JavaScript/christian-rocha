#useEffect vs useLayoutEffect


###When and how to React useLayoutEffect

The React useLayouEffect hook is written the same way as useEffect, and almost behaves the same way.

One of the key differences is that it gets executed right after a React component render lifecycle, and before useEffect gets triggered.


###why should we use this if it’s almost the same thing?

useLayoutEffect is identical to useEffect, but it’s major key difference is that it gets triggered synchronously after all DOM mutation.

this  hook might be used when you need to do any DOM changes directly.

This hook is optimized, to allow the engineer to make changes to a DOM node directly before the browser has a chance to paint.