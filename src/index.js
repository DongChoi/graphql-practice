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

const GET_MESSAGES = gql`
  query {
    messages {
      body
      user {
        username
      }
    }
  }
`;

function GetMessages() {
  const { loading, error, data } = useQuery(GET_MESSAGES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return (
    <div>
      {data.messages.map((message) => (
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

export { GetUsers, GetMessages };
