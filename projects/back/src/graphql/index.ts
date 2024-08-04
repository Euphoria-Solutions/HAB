import { gql } from '@apollo/client';
import {
  authQueryTypes,
  deliveryQueryTypes,
  feedbackQuery,
  mechanicCheckListQueryTypes,
  notificationQuery,
  postQueryTypes,
  prescriptionQueryTypes,
  vehicleQueryTypes,
  workQuery,
} from './queries';
import {
  authMutationTypes,
  deliveryMutationTypes,
  feedbackMutation,
  mechanicCheckListMutationTypes,
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
