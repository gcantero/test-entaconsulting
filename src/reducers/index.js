import { combineReducers } from "redux";
import { contractors } from "./contractors";
import { contract } from './contract';
import { insertContract } from './insertContract';
import { notifyStatus } from './notifyStatus';
import { deleteContract } from './deleteContract';
import { searchContract } from './searchContract';
import { searchProvContract } from './searchProvContract';
import { updateContract } from './updateContract';

export default combineReducers ({
    contractors,
    contract,
    insertContract,
    notifyStatus,
    deleteContract,
    searchContract,
    searchProvContract,
    updateContract
});