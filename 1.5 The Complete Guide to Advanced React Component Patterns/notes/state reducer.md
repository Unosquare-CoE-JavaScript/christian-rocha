#State reducer


###Using a State Reducer with Hooks

 the concept goes like this:

    • End user does an action
    • Dev calls dispatch
    • Hook determines the necessary changes
    • Hook calls dev's code for further changes 👈 this is the inversion of control part
    • Hook makes the state changes