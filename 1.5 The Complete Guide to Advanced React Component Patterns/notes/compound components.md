#Compound components

The idea is that you have two or more components that work together to accomplish a useful task. Typically one component is the parent, and the other is the child. The objective is to provide a more expressive and flexible API.

Think of it like select and option:
```
    <select>
      <option value="value1">key1</option>
      <option value="value2">key2</option>
      <option value="value3">key3</option>
    </select>
```


If you were to try and use one without the other it wouldn't work (or make sense). Additionally it's actually a really great API. Let's check out what it would look like if we didn't have a compound components API to work with (remember, this is HTML, not JSX):
```
<select options="key1:value1;key2:value2;key3:value3"></select>
```


So the compound components API gives you a nice way to express relationships between components.