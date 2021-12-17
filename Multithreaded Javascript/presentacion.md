#Motores de navegadores
    SpiderMonkey - firefox
    JavascriptCore  - Safari
    V8 - chrome

** Nota: Node Js también funciona con el motor V8 **

Estas diversas implementaciones utilizan un facsímil de ECMAScript pero no todos los motores implementan JS de la misma manera, por lo que pueden ocurrir errores dependiendo del navegador.

#Razones para utilizar "Worker threads"


 es recomendado utilizar los worker threads por diversas razones, pero en la parte de los navegadores, nos interesa saber que nos libera el trabajo pesado del CPU a un hilo a parte, entonces, el hilo principal puede dedicar más recursos al renderizado de la UI y así conseguir una carga más amena para el usuario final.

##Web workers

Los Web Workers hacen posible ejecutar un script en un hilo en segundo plano separado de la ejecución del hilo principal de la aplicación web. La ventaja de esto es que un proceso laborioso puede actuar en un hilo separado, permitiendo al hilo principal (normlamente la UI) ejecutarse sin ser bloqueado o ralentizado.



 ## Workers Dedicados

 Un Web Worker Dedicado, es aquél que es solo accesible por el script que lo llama.

   ###### ch2-web-workers/index.html
  ```
  <html>
    <head>
      <title>Web Workers Hello World</title>
      <script src="main.js"></script>
    </head>
  </html>
  ```


  ###### ch2-web-workers/main.js
  ```
  console.log('hello from main.js');
  const worker = new Worker('worker.js');
  worker.onmessage = (msg) => {
    console.log('message received from worker', msg.data);
  };
  worker.postMessage('message sent to worker');
  console.log('hello from end of main.js');
  ```

 ###### ch2-web-workers/worker.js

  ```
  console.log('hello from worker.js');
  self.onmessage = (msg) => {
    console.log('message from main', msg.data);
    postMessage('message sent from worker');
  };
  ```

Otro tema importante a tener en cuenta, es que en los workers dedicados, no podemos utilizar la etiqueta `<script>` dado que no tenemos un DOM asociado al worker. 
Si requerimos importar un script, se deberá hacer por medio de la funcion `importScripts()`, que es una funcion global disponible en los web workers.

## Métodos disponibles al instanciar un worker dedicado

    worker.postMessage(msg) - Manda un mensaje al worker que está siendo manejado por el event loop antes de invocar el self.onmessage.

    worker.onmessage - si está asignado, se ejecuta cuando el self.postMessage dentro del worker se ejecuta.

    worker.onerror - si está asignado, se ejecuta cuando un error se lanza dentro del worker.

    worker.onmessageerror - si está asignado. se invoca cuando el worker recibe un mensaje que no se puede deserealizar.

    worker.terminate() - si se llama, el worker termina de forma inmediata. Las llamadas futuras fallarán en silencio


  Cuando instanciamos un worker dedicado, hay un segundo parametro opcional para especificar algunas opciones en el worker. 

  ```const worker = new Worker(filename, options); ```
  
  las opciones osn las siguientes:

    type: "default" para un archivo JS clasico o "module" para especificar un módulo ECMAScript.

    credentials: este valor determina si las credenciales HTTP son enviadas con el request del archivo del worker. 
    - si omitimos el valor se excluyen las credenciales
    - "same-origin" para mandar las credenciales (si el origen coincide)
    -"include" para siempre mandar las credenciales.

    name: es el nombre que le damos al worker dedicado, y se utiliza mayormente para debugear.


##Shared worker

  un "Shared worker" es otro tipo de web worker, pero lo que lo hace especial, es que se puede acceder a este worker desde diferentes ambientes de navegador, como diferentes ventanas (pestañas), entre iframes o incluso desde diferentes web workers.

###### Advertencia
Los shared workers están deshabilitados en Safari desde el 2013.

##### Debugeando Shared Workers
Para debugear los shared workers. Firefox y Chrome tienen herramientas que nos ayudan con esto. 
en Firefox:
  Visitamos `about:debugging` en la barra de navegación.
  Clickeamos "This Firefox" en la columna de la izquierda.
  scrolleamos hasta ver la sección de "Shared Workers"

en Chrome:
  visitamos `chrome://inspect/#workers`
  buscamos la entrada de shared-worker.js
  clickeamos el link de inspeccionar junto a este.

 ##### Ejemplo
  ###### ch2-shared-workers/red.html
  ```
  <html>
    <head>
      <title>Shared Workers Red</title>
      <script src="red.js"></script>
    </head>
  </html>
  ```

  ###### ch2-shared-workers/blue.html
  ```
  <html>
    <head>
      <title>Shared Workers Blue</title>
      <script src="blue.js"></script>
    </head>
  </html>
```

para este ejemplo, utilizaremos dos archivos que representan un ambiente de JS dentro del mismo origen.

###### ch2-shared-workers/red.js
```
console.log('red.js');
const worker = new SharedWorker('shared-worker.js');
worker.port.onmessage = (event) => {
  console.log('EVENT', event.data);
};
```
Los eventos se emiten desde el shared worker.

###### ch2-shared-workers/shared-worker.js
  ```
  const ID = Math.floor(Math.random() * 999999); //1 
  console.log('shared-worker.js', ID);
  const ports = new Set(); //2
  self.onconnect = (event) => { //3
    const port = event.ports[0];
    ports.add(port);
    console.log('CONN', ID, ports.size);
    port.onmessage = (event) => { //4
      console.log('MESSAGE', ID, event.data);
      for (let p of ports) { //5
        p.postMessage([ID, event.data]);
      }
    };
  };
  ```

  1- ID aleatoreo para debug
  2- lista singleton de puertos
  3- manejador de eventos para conexión
  4- Callback para cuando se recibe un mensaje
  5- los mensajes se mandan a todas las ventanas

  ### Service Workers

  Los Service workers actúan esencialmente como proxy servers asentados entre las aplicaciones web, el navegador y la red (cuando está accesible). Están destinados, entre otras cosas, a permitir la creación de experiencias offline efectivas, interceptando peticiones de red y realizando la acción apropiada si la conexión de red está disponible y hay disponibles contenidos actualizados en el servidor. También permitirán el acceso a notificaciones tipo push y APIs de  sincronización en segundo plano.


  ##### Debugeando Service Workers

  Para entrar en el panel de inspeccion de los service workers, debemos seguir los siguientes pasos:

  Firefox:
      entrar a `about:debugging#/runtime/this-firefox`
      scrolleamos a la sección de "service workers"
  
  Chrome:
      entramos a `chrome://serviceworker-internals/`
      ahí encontraremos un listado de service workers, sus status y un logeo básico de salida.

  una alternativa para Chrome puede ser:
      `chrome://inspect/#serviceworkers` pero posee mucha menos información.


  ##### Ejemplo

  ###### ch2-service-workers/index.html

  ```
  <html>
    <head>
      <title>Service Workers Example</title>
      <script src="main.js"></script>
    </head>
  </html>
```

###### ch2-service-workers/main.js

```
 navigator.serviceWorker.register('/sw.js', { //1 
    scope: '/'
  });
  navigator.serviceWorker.oncontrollerchange = () => { //2
    console.log('controller change');
  };
  async function makeRequest() { //3
    const result = await fetch('/data.json');
    const payload = await result.json();
    console.log(payload);
  }
  ```

1- Se registra el service worker y se define el scope
2- se agrega un listener al método controllerchange
3- Función para inicializar el request.


A diferencia de los otros workers, en el Service Worker no necesitamos utilizar la palabra reservada "new", para este caso, el worker depende directamente del metodo `navigator.serviceWorker` para crear el worker.

Cuando utilizamos `navigator.serviceWorker.register` podemos utilizar dos parametros diferentes, que son:

    1 - El archivo que actuará como service worker.
    2 - Es una configuración opcional que solo soporta un scope (Directorio del origen actual donde todas 
    las peticiones que se hagan a partir de las páginas HTML tendrán que pasar por el service worker).

Una vez se haya instalado el Service Worker en la página, todas las peticiones HTTP pasarán a travez del service worker (incluyendo peticiones a diferentes origenes). 

###### ch2-service-workers/sw.js
``` 
let counter = 0;
self.oninstall = (event) => {
  console.log('service worker install');
};
self.onactivate = (event) => {
  console.log('service worker activate');
  event.waitUntil(self.clients.claim()); // 1
};
self.onfetch = (event) => {
  console.log('fetch', event.request.url);
  if (event.request.url.endsWith('/data.json')) {
    counter++;
    event.respondWith( // 2
    new Response(JSON.stringify({counter}), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    );
    return;
  }
  // fallback to normal HTTP request
  event.respondWith(fetch(event.request)); // 3
};
```

1 - Permite al Service Worker funcionar como un controlador para todos los clientes (acciona el metodo controllerchange en `navigator.serviceWorker`).
2 - Sobre escribe la respuesta cuando se llama /data.json.
3 - Sigue el flujo normal del network.


### Conceptos Avanzados de Service Worker

Los SW también se utilizan para ejecutar operaciones async. Por eso mismo, la API de localStorage no está disponible. Para estos casos, tenemos disponible la API indexedDB.

Los Sw se cachean de manera agresiva por los navegadores. Cuando refrescamos la página, el navegador hará una petición para actualizar el script, pero si este no ha cambiado, no se reemplazará.

Todo SW pasa a travez de un proceso de cambios de estado desde su creación hasta el momento que puede ser usado, aquí una lista de ellos:


    - parsed
    Es el primer estado del SW. en este punto, el contenido de JS ya fue parseado.
    Este es un estado interno y es muy raro encontrarnos con este mismo.

    - installing
    La instalación comenzó pero no ha terminado.
    Esto solo pasa una vez por versión.
    Este estado está activo despues de que `oninstall` es llamado y antes de que `event.respondwith()` se haya resuelto.

    - installed
    En este punto, la instalación ya está terminada. El metodo `onactive` se llamará justo después de esto.
      ** NOTA: de "installing" a "activating" pasa tan rápido que es muy raro notar el estado "installed". **

    - activating
    Este estado ocurre cuando `onactivate` es llamado pero `event.respondWith()` no se ha resuelto.

    - activated
    La activación está completada y el worker está listo para funcionar. En este punto, los fetch serán interceptados.

    - redundant
    En este punto, una nueva versión del script se ha cargado y el script anterior ya no es necesario.
    Esto también puede ocurrir si el script del worker falla al descargarse, si contiene un "syntax error" o si se lanza un error.

Los SW deben ser tratados como una mejora progresiva. Esto significa que una página web que usa el mismo, deberá siempre funcionar como lo hacía habitualmente.


### Message Passing Abstractions

##### Patrón RPC (Remote Procedure Call)

Es una manera de tomar la representación de una función y sus argumentos, serializarla y pasarla a un destino remoto para su ejecución.

Para esto, existe cierta complejidad. Si el hilo principal solo manda un mensaje a un Web Worker a la vez, entonces sabemos que cuando el Web Worker responda, esa respuesta será para ese mensaje que mandamos previamente. Pero, si mandamos multiples mensajes al mismo tiempo, no hay una manera simple de relacionar las respuestas.

por ejemplo:
```
worker.postMessage('square_sum|num:4');
worker.postMessage('fibonacci|num:33');
worker.onmessage = (result) => {
  // Qué resultado pertenece a qué mensaje?
  // '3524578'
  // 4.1462643
};
```

Por suerte, existe un estandar para pasar mensajes al patrón RPC. Este estandar se llama JSON-RPC, y es relativamente sencillo implementarlo.

Este estandar define una representación en JSON de los objetos de petición y respuesta como un objeto "notification", esta es una forma de definir el metodo a llamar y los argumentos del request, los resultados en la respuesta, y un mecanismo para asociar las peticiones con las respuestas. Incluso soporta valores de error y acumulado de peticiones.

##### Ejemplo

Tomando las dos funciones de nuestro anterior ejemplo, con JSON-RPC se vería así:

```
// worker.postMessage
{"jsonrpc": "2.0", "method": "square_sum", "params": [4], "id": 1}
{"jsonrpc": "2.0", "method": "fibonacci", "params": [33], "id": 2}
// worker.onmessage
{"jsonrpc": "2.0", "result": "3524578", "id": 2}
{"jsonrpc": "2.0", "result": 4.1462643, "id": 1}
```


### Patrón Command Dispatcher 
Este patrón es sencillo de implementar en sí. Primero, debemos asumir que tenemos dos variables que contienen información relevante sobre el metodo o comando que el código necesita correr. Donde:

primer parametro: Metodo (string)
Segundo parametro: Variable args (arreglo de valores a pasar al método)

Por último, el código puede estar en distintas partes de la aplicación. Por ejemplo, el "square_sum" vive en una libreria y "Fibonacci" es algo que se hizo localmente.

Otro concepto importante es que solo comandos definidos deberán ejecutarse. Si queremos invocar un metodo que no existe, debemos generar un error para regresarlo al momento de su ejecución sin romper el web worker.