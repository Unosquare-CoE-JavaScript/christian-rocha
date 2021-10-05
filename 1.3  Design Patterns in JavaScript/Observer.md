#Observer Pattern

The Observer is a design pattern where an object (known as a subject) maintains a list of objects depending on it (observers), automatically notifying them of any changes to state.

When a subject needs to notify observers about something interesting happening, it broadcasts a notification to the observers (which can include specific data related to the topic of the notification).

When we no longer wish for a particular observer to be notified of changes by the subject they are registered with, the subject can remove them from the list of observers.

It's often useful to refer back to published definitions of design patterns that are language agnostic to get a broader sense of their usage and advantages over time. The definition of the Observer pattern provided in the GoF book, Design Patterns: Elements of Reusable Object-Oriented Software, is:

    "One or more observers are interested in the state of a subject and register their interest with the subject by attaching themselves. When
    something changes in our subject that the observer may be interested in, a notify message is sent which calls the update method in each
    observer. When the observer is no longer interested in the subject's state, they can simply detach themselves."
