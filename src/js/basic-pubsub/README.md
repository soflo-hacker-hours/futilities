
## Basic PubSub

Whenever I build a React project, I tend to need some way to communicate globally between components without worrying about passing props around. This is the standard code I use for a messaging service. Nothing in here is related to React, though.

Fair warning: this code assumes (1) ES6 imports and (2) that you have lodash. If not, well, I'm sure you can figure it out.
