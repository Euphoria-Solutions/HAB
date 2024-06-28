import { gql } from '@apollo/client';

export const workQuery = gql`
  type Work {
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
  }

  extend type Query {
    getWorks(_id: String): [Work]
  }
`;
