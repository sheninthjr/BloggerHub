
import { atom } from 'recoil';

export const userDetails = atom({
    key:"userDetails",
    default:{
        id:null,
        name:null,
        image:null
    }
})