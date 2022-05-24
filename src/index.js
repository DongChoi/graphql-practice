import React, { useState } from "react";
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
    createUser(username: $username, first_name: $first_name, last_name: $last_name)
    {
      username
      first_name
      last_name
    }
  }
`

function AddUser() {

  const initialFormData = {
    usernameInput : "",
    firstNameInput : "",
    lastNameInput : ""
  }

  const [formData, setFormData] = useState(initialFormData)

  const [addUser, { data, loading, error }] = useMutation(ADD_USER);

  if (loading) return 'Submitting...';
  if (error) {
    return `Submission error! ${error.message}`;
  }

  function handleSubmit(event) {
    event.preventDefault();
    addUser({
      variables: {
        username: formData.usernameInput,
        first_name: formData.firstNameInput, last_name: formData.lastNameInput
      }
    });
    setFormData(initialFormData);
  }

  function handleChange(event) {
    const {name, value} = event.target;

    setFormData(fData => ({...fData, [name] : value}))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={formData.usernameInput}
          name="usernameInput"
        />
        <input
          onChange={handleChange}
          value={formData.firstNameInput}
          name="firstNameInput"
        />
        <input
          onChange={handleChange}
          value={formData.lastNameInput}
          name="lastNameInput"
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

function GetMessages({ username }) {
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
