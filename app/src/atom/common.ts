import { atom } from "jotai";

const selectedRequestAtom = atom("");
const isFormModalOpenAtom = atom(false);

export { selectedRequestAtom, isFormModalOpenAtom };
