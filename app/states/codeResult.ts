import { atom } from 'recoil';

export const CodeResult = atom<string>({
    key:'code-result',
    default:''
});