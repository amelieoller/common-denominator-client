import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Tiles from "../Tiles/Tiles";

import Item from "./Item";
import NewTile from "../NewTile/NewTile";
import { formatNames } from "../utils";
import Title from "../Title/Title";

const Items = ({ group, category, firebase, authUser }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleOnDone = () => {
    console.log(items);
    const userA = group.users[0];
    const userB = group.users[1];
    const harmonyCoefficient = group.harmony;
    const randomMultiplier = (2 + harmonyCoefficient * 5) * group.randomness;
    const randomTerm = Math.floor(Math.random() * randomMultiplier);

    debugger;
    const results = items.map((item) => {
      const ratings = item.ratings;
      let ratingA;
      let ratingB;

      group.users.map((user) => {
        const currentUserRating = ratings[user.uid];

        const result =
          voteA +
          voteB +
          harmonyCoefficient * voteA * voteB -
          harmonyCoefficient * difference +
          randomTerm;

        return result;
      });

      const voteA = ratingA.value;
      const voteB = ratingB.value;

      const difference = (voteA - voteB).abs;

      // const privilegeA = userA.privilege;
      // const privilegeB = userB.privilege;

      // const result =
      //   privilegeA * voteA +
      //   privilegeB * voteB +
      //   harmonyCoefficient * voteA * voteB -
      //   harmonyCoefficient * difference +
      //   randomTerm;

      const result =
        voteA +
        voteB +
        harmonyCoefficient * voteA * voteB -
        harmonyCoefficient * difference +
        randomTerm;

      return result;
    });

    const resultIndex = results.each_with_index.max[1];
    const resultItem = category.items[resultIndex];

    return resultItem;
  };

  const groupMembers = group.users.map((user) => user.username);

  return (
    <div>
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
        <NewTile
          handleAddNewItem={onCreateItem}
          placeholderText="Add New Item"
          buttonText="Add"
        />
      </Tiles>
      <button className="pure-button" onClick={handleOnDone}>
        Done
      </button>
    </div>
  );
};

Items.propTypes = {};

export default Items;
