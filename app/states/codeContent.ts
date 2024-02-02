import { atom } from 'recoil';

export const CodeContent = atom<string>({
    key:'code-content',
    default:'',
})