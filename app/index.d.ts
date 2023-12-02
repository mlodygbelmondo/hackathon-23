import { type AriaAttributes } from "react";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    lat?: number;
    lng?: number;
    text?: string;
  }
}
