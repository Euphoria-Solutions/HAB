import { mapValues } from 'lodash';
import {
  login,
  createUser,
  editUser,
  deleteUser,
  getUsers,
  verifyToken,
  changePassword,
} from './user';
import { createPost, deletePost, editPost, getPosts } from './post';
import {
  createVehicle,
  deleteVehicle,
  editVehicle,
  getVehicle,
} from './vehicle';
import {
  createDelivery,
  deleteDelivery,
  editDelivery,
  getDeliveries,
} from './delivery';
import {
  addPrescription,
  editPrescription,
  getPresciptions,
  removePrescription,
} from './prescription';
import {
  addDriverJob,
  deleteDriverJob,
  editDriverJob,
  getDriverJob,
} from './driver-job';
import {
  addMechanicEngineerJob,
  deleteMechanicEngineerJob,
  editMechanicEngineerJob,
  getMechanicEngineerJob,
} from './mechanic-engineer-job';
import {
  addHabEngineerJob,
  deleteHabEngineerJob,
  editHabEngineerJob,
  getHabEngineerJob,
} from './hab-engineer-job';
import {
  createNotification,
  deleteNotification,
  editNotification,
  getNotifications,
} from './notifications';
import { createWork, deleteWork, editWork, getWorks } from './work';
import {
  createMechanicalCheckList,
  deleteMechanicalCheckList,
  editMechanicalCheckList,
  getMechanicalCheckList,
} from './mechincal-check-list';
import { createFeedback, deleteFeedback, getFeedbacks } from './feedback';

export const resolversObjects = {
  Query: {
    helloQuery: () => 'Hello Query',
    getUsers,
    getVehicle,
    getPresciptions,
    getMechanicalCheckList,
    getPosts,
    getDeliveries,
    getDriverJob,
    getMechanicEngineerJob,
    getHabEngineerJob,
    getWorks,
    getNotifications,
    getFeedbacks,
  },
  Mutation: {
    helloMutation: () => 'Hello Mutation',
    //* Auth
    login,
    createUser,
    editUser,
    deleteUser,
    verifyToken,
    changePassword,

    //* Post
    createPost,
    editPost,
    deletePost,

    //* Vehicle
    createVehicle,
    editVehicle,
    deleteVehicle,

    //* Delivery
    createDelivery,
    editDelivery,
    deleteDelivery,

    //* Prescriptions
    addPrescription,
    editPrescription,
    removePrescription,

    //* VehicleList
    createMechanicalCheckList,
    editMechanicalCheckList,
    deleteMechanicalCheckList,

    //* DriverJob
    addDriverJob,
    editDriverJob,
    deleteDriverJob,

    //* HabEngineerJob
    addHabEngineerJob,
    editHabEngineerJob,
    deleteHabEngineerJob,

    //* MechanicEngineerJob
    addMechanicEngineerJob,
    editMechanicEngineerJob,
    deleteMechanicEngineerJob,

    //* Work
    createWork,
    editWork,
    deleteWork,

    //* Notifications
    createNotification,
    editNotification,
    deleteNotification,

    //* Feedback
    createFeedback,
    deleteFeedback,
  },
};

export const allResolvers = mapValues(resolversObjects, entries =>
  mapValues(entries)
);
