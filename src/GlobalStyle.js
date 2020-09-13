import * as styled from "styled-components";

import reset from "styled-reset";

export default styled.createGlobalStyle`
  /* CSS Reset */
  ${reset}

  body {
    font-family: "Roboto", sans-serif;
    background: ${({ theme }) => theme.dark};
    color: ${({ theme }) => theme.dark};
    line-height: 1.7em;
    font-size: 13px;
    font-weight: 400;
  }

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  /* Headers */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Roboto", sans-serif;
    font-weight: bold;
    color: ${({ theme }) => theme.light};
    font-weight: 300;
  }

  label,
  input,
  textarea {
    color: ${({ theme }) => theme.dark};
  }

  h1 {
    font-size: 2em;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
  }

  h2 {
    font-size: 1.5em;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
  }

  h3 {
    font-size: 1.17em;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  h4 {
    margin-top: 1.33em;
    margin-bottom: 1.33em;
  }

  h5 {
    font-size: 0.83em;
    margin-top: 1.67em;
    margin-bottom: 1.67em;
  }

  h6 {
    font-size: 0.67em;
    margin-top: 2.33em;
    margin-bottom: 2.33em;
  }

  .pure-img-responsive {
    max-width: 100%;
    height: auto;
  }

  a {
    color: ${({ theme }) => theme.secondary};
  }

  /*
 * -- LAYOUT STYLES --
 * These are some useful classes which I will need
 */
  .l-box {
    padding: 1em;
  }

  .l-box-lrg {
    padding: 2em;
  }

  .is-center {
    text-align: center;
  }

  /*
 * -- PURE FORM STYLES --
 * Style the form inputs and labels
 */
  .pure-form label {
    margin: 1em 0 0;
    font-weight: bold;
    font-size: 100%;
  }

  .pure-form input[type] {
    border: 1px solid #ddd;
    box-shadow: none;
    font-size: 100%;
    width: 100%;
    margin-bottom: 0.5em;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  /*
 * -- PURE BUTTON STYLES --
 * I want my pure-button elements to look a little different
 */
  .pure-button {
    /* background-color: #1f8dd6;
    color: white;
    padding: 0.5em 2em;
    border-radius: 5px; */

    padding: 0.35em 0.75em;
  }

  .pure-button-primary {
    background: transparent;
    color: ${({ theme }) => theme.primary};
    border: 1px solid;
    /* font-size: 120%; */

    &:hover,
    &:focus {
      background-image: none;
      background: ${({ theme }) => theme.secondary};
      border-color: ${({ theme }) => theme.secondaryDark};
      color: ${({ theme }) => theme.light};
    }
  }

  .pure-button-disabled,
  .pure-button[disabled] {
    border: 1px solid #4ecdc4;
  }

  .button-success,
  .button-error,
  .button-warning,
  .button-secondary {
    color: white;
    text-shadow: none;
  }

  .button-success {
    border: 1px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    background: transparent;
  }

  .button-error {
    border: 1px solid ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.secondary};
    background: transparent;
  }

  .button-warning {
    border: 1px solid rgb(223, 117, 20);
    color: rgb(223, 117, 20);
    background: transparent;
  }

  .button-secondary {
    border: 2px solid rgb(66, 184, 221);
    color: rgb(66, 184, 221);
    background: transparent;
  }

  .icon-button {
    border: none;
    padding: 0;
    background: none;

    &:hover {
      opacity: 0.8;
      background-image: none;
    }
  }

  /*
 * -- MENU STYLES --
 * I want to customize how my .pure-menu looks at the top of the page
 */

  .home-menu {
    padding: 0.5em;
    text-align: center;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  .home-menu {
    background: ${({ theme }) => theme.primary};
  }
  .pure-menu.pure-menu-fixed {
    /* Fixed menus normally have a border at the bottom. */
    border-bottom: none;
    /* I need a higher z-index here because of the scroll-over effect. */
    z-index: 4;
  }

  .home-menu .pure-menu-heading {
    color: white;
    font-weight: 400;
    font-size: 120%;
  }

  .home-menu .pure-menu-selected a {
    color: white;
  }

  .home-menu .pure-menu-selected a:visited {
    color: ${({ theme }) => theme.dark};
  }

  .home-menu a {
    color: ${({ theme }) => theme.light};
  }

  .home-menu li a:hover,
  .home-menu li a:focus {
    background: none;
    border: none;
    color: ${({ theme }) => theme.secondary};
  }

  /*
 * -- SPLASH STYLES --
 * This is the blue top section that appears on the page.
 */

  .splash-container {
    background: #1f8dd6;
    z-index: 1;
    overflow: hidden;
    /* The following styles are required for the "scroll-over" effect */
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed !important;
    padding: 60px 0;
    overflow: scroll;
  }

  .splash {
    /* absolute center .splash within .splash-container */
    width: 50%;
    height: 50%;
    margin: auto;
    position: absolute;
    top: 100px;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
  }

  .notification {
    color: ${({ theme }) => theme.secondary};
    font-style: italic;
    font-size: 14px;
  }

  /* This is the main heading that appears on the blue section */
  .splash-head {
    font-size: 20px;
    font-weight: bold;
    color: white;
    border: 3px solid white;
    padding: 1em 1.6em;
    font-weight: 100;
    border-radius: 5px;
    line-height: 1em;
  }

  /* This is the subheading that appears on the blue section */
  .splash-subhead {
    color: white;
    letter-spacing: 0.05em;
    opacity: 0.8;
  }

  /*
 * -- CONTENT STYLES --
 * This represents the content area (everything below the blue section)
 */
  .content-wrapper {
    /* These styles are required for the "scroll-over" effect */
    position: absolute;
    top: 87%;
    width: 100%;
    min-height: 12%;
    z-index: 2;
    background: white;
  }

  /* We want to give the content area some more padding */
  .content {
    padding: 1em 1em 3em;
  }

  /* This is the class used for the main content headers (<h2>) */
  .content-head {
    text-transform: uppercase;
  }

  /* This is a modifier class used when the content-head is inside a ribbon */
  .content-head-ribbon {
    /* color: white; */
  }

  /* This is the class used for the content sub-headers (<h3>) */
  .content-subhead {
    color: #1f8dd6;
  }
  .content-subhead i {
    margin-right: 7px;
  }

  /* This is the class used for the dark-background areas. */
  .ribbon {
    background: #2d3e50;
    color: #aaa;
  }

  /* This is the class used for the footer */
  .footer {
    background: #111;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  /*
 * -- TABLET (AND UP) MEDIA QUERIES --
 * On tablets and other medium-sized devices, we want to customize some
 * of the mobile styles.
 */
  @media (min-width: 48em) {
    /* We increase the body font size */
    body {
      font-size: 16px;
    }

    /* We can align the menu header to the left, but float the
    menu items to the right. */
    .home-menu {
      text-align: left;
    }
    .home-menu ul {
      float: right;
    }

    /* We increase the height of the splash-container */
    /*    .splash-container {
        height: 500px;
    }*/

    /* We decrease the width of the .splash, since we have more width
    to work with */
    .splash {
      width: 40%;
      height: 60%;
    }

    .splash-head {
      font-size: 250%;
    }

    /* We remove the border-separator assigned to .l-box-lrg */
    .l-box-lrg {
      border: none;
    }
  }

  /*
 * -- DESKTOP (AND UP) MEDIA QUERIES --
 * On desktops and other large devices, we want to over-ride some
 * of the mobile and tablet styles.
 */
  @media (min-width: 78em) {
    /* We increase the header font size even more */
    .splash-head {
      font-size: 300%;
    }
  }
`;
