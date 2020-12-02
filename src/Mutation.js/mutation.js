import gql from "graphql-tag";

export default gql`
  mutation userAdded(
    $name: String
    $emailId: String
    $password: String
    $bloodGroup: String
    $phoneNumber: Int
    $state: String
    $city: String
  ) {
    userAdded(
      name: $name
      emailId: $emailId
      password: $password
      bloodGroup: $bloodGroup
      phoneNumber: $phoneNumber
      state: $state
      city: $city
    ) {
      emailId
      name
      phoneNumber
      bloodGroup
      password
      state
      city
      _id
    }
  }
`;
