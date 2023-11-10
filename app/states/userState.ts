import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userState = atom<string | null >({
    key:'user-state',
    default: null,
    effects_UNSTABLE: [persistAtom],
});