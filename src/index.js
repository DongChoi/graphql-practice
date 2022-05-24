import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://users-messages-gql.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

const GET_USERS = gql`
  query {
    users {
      username
      first_name
      last_name
    }
  }
`;

function GetUsers() {
  const { loading, error, data } = useQuery(GET_USERS);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return (
    <div>
      {data.users.map((user) => (
        <div>{user.username}</div>
      ))}
    </div>
  );
}

const ADD_USER = gql`
  mutation CreateUser($username: ID!, $first_name: String!, $last_name: String!){
    createUser(username: $username, first_name: $firstName, last_name: $lastName)
    {
      username
      first_name
      last_name
    }
  }
`

function AddUser() {
  let usernameInput;
  let firstNameInput;
  let lastNameInput;

  const [addUser, { data, loading, error }] = useMutation(ADD_USER);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log(usernameInput.value);
          addUser({ variables: { username: usernameInput.value, 
            first_name: firstNameInput.value, last_name: lastNameInput.value } });
          debugger;
          usernameInput.value = '';
          firstNameInput.value = '';
          lastNameInput.value = '';
        }}
      >
        <input
          ref={node => {
            usernameInput = node;
          }}
        />
        <input
          ref={node => {
            firstNameInput = node;
          }}
        />
        <input
          ref={node => {
            lastNameInput = node;
          }}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

const GET_MESSAGES = gql`
  query getUserMessages($username: ID!){
    user(username: $username){
      messages {
        body
      }
    }
  }
`;

function GetMessages({username}) {
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { username },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return (
    <div>
      {data.user.messages.map((message) => (
        <div>{message.body}</div>
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { GetUsers, GetMessages, AddUser };
