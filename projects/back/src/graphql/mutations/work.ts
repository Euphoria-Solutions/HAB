import { gql } from '@apollo/client';

export const workMutation = gql`
  extend type Mutation {
    createWork(
      vehicle: String
      delivery: String
      mechanicCheckList: String
      prescription: String
      mechanicEngineerConfirmation: String
      habEngineerConfirmation: String
      driverConfirmation: String
      progress: String
      managerState: String
      state: String
    ): Boolean!
    editWork(
      _id: String
      vehicle: String
      delivery: String
      mechanicCheckList: String
      prescription: String
      mechanicEngineerConfirmation: String
      habEngineerConfirmation: String
      driverConfirmation: String
      progress: String
      managerState: String
      state: String
    ): Boolean!
    deleteWork(_id: String): Boolean!
  }
`;
