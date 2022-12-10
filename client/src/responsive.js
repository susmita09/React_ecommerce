import { css } from "@emotion/react";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};

export const tab = (props) => {
  return css`
    @media screen and (max-width: 850px) {
      ${props}
    }
  `;
};
