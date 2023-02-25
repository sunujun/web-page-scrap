import { atom, AtomEffect } from 'recoil';
import { getItem, removeItem, setItem } from '../utils/AsyncStorageUtils';

export interface LinkItem {
    title: string;
    image: string;
    link: string;
    createdAt: string;
}

const asyncStorageEffect =
    (key: string): AtomEffect<{ list: LinkItem[] }> =>
    ({ setSelf, onSet, trigger }) => {
        const loadPersisted = async () => {
            const savedValue = await getItem(key);
            if (savedValue !== null) {
                setSelf(JSON.parse(savedValue));
            }
        };
        if (trigger === 'get') {
            loadPersisted();
        }
        onSet((newValue, _, isReset) => {
            isReset ? removeItem(key) : setItem(key, JSON.stringify(newValue));
        });
    };

export const atomLinkList = atom<{ list: LinkItem[] }>({
    key: 'MAIN/LINK_LIST',
    default: {
        list: [],
    },
    effects: [asyncStorageEffect('MAIN/LINK_LIST')],
});
