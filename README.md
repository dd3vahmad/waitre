# Restaurant Chatbot

A simple restaurant chatbot that assists customers in placing their orders for their preferred meal. Built with react for frontend, node express for backend and socket.io for bidirectional communicatioin between user and the bot.

## How It Works

The chatbot help user to interact in a restaurant based on the option selected by the user. The options are:

- Select 1 to place an order
- Select 97 to see current order
- Select 98 to see order history
- Select 99 to checkout an order - (Returns "Order placed" if there's an order to checkout and "No order to checkout if there's none.")
- Select 0 to cancel present order

## Technologies Used

- Node Express - as the backend framework to create the backend server
- Socket.io - as the web socket technology for bidirectional comunication between the client and server. For real-time communication.
- Joi - for input validation
