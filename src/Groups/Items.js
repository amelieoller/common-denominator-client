import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import Tiles from "../Tiles/Tiles";

import Item from "./Item";
import NewTile from "../NewTile/NewTile";
import { formatNames } from "../utils";
import Title from "../Title/Title";
import GroupSettingsTile from "./GroupSettingsTile";
import Tile from "../Tile/Tile";
import Spinner from "../atoms/Spinner/Spinner";

const Items = ({ group, category, firebase, authUser }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) setTimeout(() => setError(null), 5000);
  }, [error]);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = firebase
      .items(group.uid, category.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          let items = [];
          snapshot.forEach((doc) => items.push({ ...doc.data(), uid: doc.id }));

          setLoading(false);
          setItems(items.reverse());
        } else {
          setLoading(false);
          setItems(null);
        }
      });

    return () => {
      unsubscribe();
    };
  }, [category.uid, firebase, group.uid]);

  const onCreateItem = (text) => {
    firebase.items(group.uid, category.uid).add({
      title: text,
      createdAt: firebase.fieldValue.serverTimestamp(),
      ratings: {},
    });
  };

  const isValid = () => {
    // if vetoes are lower than allowed, then true, otherwise add error
    const currentUserVetoes = items.reduce(
      (acc, item) => (item.ratings[authUser.uid] === 0 ? acc + 1 : acc),
      0
    );
    const totalNumItems = items.length;
    const totalVetoesPossible = Math.ceil(category.vetoes * totalNumItems);
    const vetoDifference = Math.abs(totalVetoesPossible - currentUserVetoes);

    if (currentUserVetoes <= totalVetoesPossible) {
      return true;
    } else {
      if (vetoDifference === 1) {
        setError(`You are using ${vetoDifference} veto too many.`);
      } else {
        setError(`You are using ${vetoDifference} vetoes too many.`);
      }

      return false;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateResultForOneItem = (item, groupUsers) => {
    const harmony = category.harmony;
    const randomness = category.randomness; // 0.2
    const n = group.userIds.length;

    const votes = item.ratings;
    const votesArr = Object.values(votes);
    const voteTotal = votesArr.reduce((acc, curr) => acc + curr, 0);
    const voteAvg = voteTotal / n;

    const additiveVote = groupUsers.reduce(
      (acc, currUser) => acc + currUser.privilege * votes[currUser.uid],
      0
    );
    const multiplicativeVote = votesArr.reduce((acc, curr) => acc * curr, 1);
    const subtractiveVote = votesArr.reduce(
      (acc, curr) => acc + Math.abs(curr - voteAvg),
      0
    );

    const maxRandomness = 10 + harmony * 25;

    const result =
      additiveVote / n +
      5 * harmony * Math.pow(multiplicativeVote, 1 / n) +
      (randomness * maxRandomness - 2 * harmony * (subtractiveVote / n));

    return {
      ratings: item.ratings,
      title: item.title,
      result: +result.toFixed(2),
    };
  };

  const updatePrivilege = () => {};

  useEffect(() => {
    if (
      category?.membersFinished.length === group.userIds.length &&
      items.length &&
      !category.highestRatedItem?.title
    ) {
      // All users are done
      const groupUsers = group.users;
      const voteResults = items.map((item) =>
        calculateResultForOneItem(item, groupUsers)
      );

      const highestRatedItem = voteResults.reduce((prev, current) =>
        prev.result > current.result ? prev : current
      );

      firebase.category(group.uid, category.uid).update({
        highestRatedItem: highestRatedItem,
        editedAt: firebase.fieldValue.serverTimestamp(),
      });

      console.log("calculating");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category.membersFinished, category.highestRatedItem, group, items]);

  const handleOnDone = () => {
    if (!category.membersFinished.includes(authUser.uid) && isValid()) {
      firebase.category(group.uid, category.uid).update({
        membersFinished: [...category.membersFinished, authUser.uid],
        editedAt: firebase.fieldValue.serverTimestamp(),
      });
    }
  };

  const handleUndoDone = () => {
    if (category.membersFinished.includes(authUser.uid)) {
      firebase.category(group.uid, category.uid).update({
        membersFinished: category.membersFinished.filter(
          (m) => m !== authUser.uid
        ),
        editedAt: firebase.fieldValue.serverTimestamp(),
      });
    }
  };

  const clearVotes = () => {
    firebase.category(group.uid, category.uid).update({
      membersFinished: [],
      highestRatedItem: {},
      editedAt: firebase.fieldValue.serverTimestamp(),
    });
  };

  const groupMembers = group.users.map((user) => user.username);

  const isFinished = category?.membersFinished.includes(authUser.uid);

  const lockItems = category?.membersFinished.length;

  const renderResultScreen = () => (
    <StyledResultScreen>
      <h3 className="content-head content-head-ribbon">
        Your common denominator is...
      </h3>

      <Tile>
        <h2>{category.highestRatedItem.title}</h2>
      </Tile>

      <MarginTopButton
        className="pure-button pure-button-primary"
        onClick={() => {
          clearVotes();
        }}
      >
        Start Over
      </MarginTopButton>
    </StyledResultScreen>
  );

  if (loading) return <Spinner />;

  if (isFinished) {
    if (category?.highestRatedItem?.title) {
      return <div className="splash">{renderResultScreen()}</div>;
    } else {
      return (
        <div className="splash">
          <Notification>Please wait for everyone to get finished</Notification>
          <button
            className="pure-button pure-button-primary"
            onClick={handleUndoDone}
          >
            Go Back
          </button>
        </div>
      );
    }
  } else {
    return (
      <>
        <Title
          backButtonText="Categories"
          backLink={`/groups/${group.uid}/categories`}
        >
          <h1 className="content-head content-head-ribbon">
            {formatNames(groupMembers, category.title)}
          </h1>
        </Title>

        <Tiles>
          {items &&
            items.map((item) => (
              <Item
                key={item.uid}
                group={group}
                category={category}
                item={item}
                firebase={firebase}
                authUser={authUser}
              />
            ))}
          {!lockItems && (
            <>
              <GroupSettingsTile
                group={group}
                category={category}
                firebase={firebase}
              />

              <NewTile
                handleAddNewItem={onCreateItem}
                placeholderText="Add New Item"
                buttonText="Add"
              />
            </>
          )}
        </Tiles>

        {error && <p>{error}</p>}

        <MarginTopButton
          className="pure-button pure-button-primary"
          onClick={handleOnDone}
        >
          Done - Get Me Some Results
        </MarginTopButton>
      </>
    );
  }
};

const Notification = styled.div`
  color: ${({ theme }) => theme.light};
  font-size: 20px;
  font-style: italic;
  line-height: 22px;
  margin-bottom: 25px;
`;

const StyledResultScreen = styled.div`
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MarginTopButton = styled.button`
  margin-top: ${({ theme }) => theme.padding};
`;

Items.propTypes = {};

export default Items;
