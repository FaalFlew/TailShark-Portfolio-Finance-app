#TailShark web app
Tailshark is where you will find relevant financial documents relating to publicly traded companies and their stocks. The web app effectively utilizes IndexedDB to store previously requested company data on the client side. This ensures optimal experience during network outages, also improves the load time and reduces mobile data consumption for users on limited data plans. The approach significantly limits redundant API requests and reduces load on the server.
Currently the User is also able to  add their favourite stocks to a temporary portfolio.

TODO:
Authentication: JWT Tokens
Security: OAuth2
Web api: store user stock portfolio
