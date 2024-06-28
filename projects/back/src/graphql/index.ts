import { gql } from '@apollo/client';
import {
  authQueryTypes,
  deliveryQueryTypes,
  driverJobQuery,
  feedbackQuery,
  habEngineerJobQuery,
  mechanicCheckListQueryTypes,
  mechanicEngineerJobQuery,
  notificationQuery,
  postQueryTypes,
  prescriptionQueryTypes,
  vehicleQueryTypes,
  workQuery,
} from './queries';
import {
  authMutationTypes,
  deliveryMutationTypes,
  driverJobMutation,
  feedbackMutation,
  habEngineerJobMutation,
  mechanicCheckListMutationTypes,
  mechanicEngineerJobMutation,
  notificationMutation,
  postMutationTypes,
  prescriptionMutationTypes,
  vehicleMutationTypes,
  workMutation,
} from './mutations';

export const typeDefs = gql`
  # Queries
  ${authQueryTypes}
  ${deliveryQueryTypes}
  ${postQueryTypes}
  ${mechanicCheckListQueryTypes}
  ${prescriptionQueryTypes}
  ${vehicleQueryTypes}
  ${driverJobMutation}
  ${habEngineerJobMutation}
  ${mechanicEngineerJobMutation}
  ${workQuery}
  ${notificationQuery}
  ${feedbackQuery}

  # Mutations
  ${authMutationTypes}
  ${deliveryMutationTypes}
  ${postMutationTypes}
  ${mechanicCheckListMutationTypes}
  ${prescriptionMutationTypes}
  ${vehicleMutationTypes}
  ${driverJobQuery}
  ${habEngineerJobQuery}
  ${mechanicEngineerJobQuery}
  ${workMutation}
  ${notificationMutation}
  ${feedbackMutation}

  type Query {
    helloQuery: String
  }

  type Mutation {
    helloMutation: String
  }
`;
