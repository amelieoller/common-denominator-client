import React from "react";
import styled from "styled-components/macro";
import { Switch, Route } from "react-router-dom";

import useFormInput from "../hooks/useFormInput";
import { fetchPatchFriendship } from "../api/friendship";

const SettingsPage = () => {
  const [harmony, bindHarmony, resetHarmony] = useFormInput("");
  const [randomness, bindRandomness, resetRandomness] = useFormInput("");

  const handleSubmit = () => {
    fetchPatchFriendship();
    resetHarmony();
    resetRandomness();
  };

  return (
    <StyledSettingsPage>
      <h1 className="content-head content-head-ribbon">Settings</h1>

      <form onSubmit={handleSubmit} className="pure-form">
        <fieldset>
          <input
            {...bindHarmony}
            type="text"
            placeholder="Harmony Coefficient"
          />
          <input
            {...bindRandomness}
            type="text"
            placeholder="Randomness Factor"
          />

          <button type="submit" className="pure-button">
            Update Settings
          </button>
        </fieldset>
      </form>
    </StyledSettingsPage>
  );
};
const StyledSettingsPage = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export default SettingsPage;
