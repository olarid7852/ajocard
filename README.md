# Ajocard

Ajocard is a test api server, built for transactions

## Features

### Users

- User Signup
- Agent Signup
- Create a transaction (money sending)
- Confirm a transaction
- fetch all transactions



## Installation

Clone repo to your local machine:

```git
git clone https://github.com/mustaphee/ajocard.git
```

**Install dependencies and run locally**<br/>
*Note>> Install npm if not already installed on local machine*

Then run:

```npm
npm install
```

Create .env like the .env.sample file, just replace with your own enviroment variables.

Now start the server:

```npm
nodemon server     /* Keep watching files for changes */
```

## Testing

To run tests:

```npm
npm run test       
```

## API

API is deployed at [here](https://my-ajocard.herokuapp.com/) on heroku.


### API Routes

<table>
	<tr>
		<th>HTTP VERB</th>
		<th>ENDPOINT</th>
		<th>FUNCTIONALITY</th>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/auth/signup</td> 
		<td>Create user account</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/transfer</td> 
		<td>Initialize Transfer</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/confirm/transfer</td> 
		<td>Confirm Transfer</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/transactions</td> 
		<td>To fetch all transactions</td>
	</tr>
</table>  
