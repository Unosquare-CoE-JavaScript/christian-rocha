#Micro tasks vs Macro taks

Javascript creates micro tasks, and they are a priority and the event loop must finish them in the order they
are provided, but when we use timeout or we just click on a button or something in the webpage, it creates a macro task.
The Macro tasks receive attention until all the micro tasks are finished.