import { atom } from 'recoil';

export const codeLang = atom<any>({
    key:'code-lang',
    default: {name:'javascript', val: 'js'},
});