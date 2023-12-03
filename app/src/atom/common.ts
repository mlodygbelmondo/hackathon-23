import { atom } from "jotai";

const selectedRequestAtom = atom(-1);
const isFormModalOpenAtom = atom(false);

export { isFormModalOpenAtom, selectedRequestAtom };
