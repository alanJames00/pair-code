import { atom } from 'recoil';


export const userState = atom<string | null >({
    key:'user-state',
    default: null
});