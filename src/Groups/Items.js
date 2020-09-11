import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Items = ({ group, category, firebase }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItemTitle, setNewItemTitle] = useState(true);

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
  }, [category.id, category.uid, firebase, group.uid]);

  const onCreateItem = (e, authUser) => {
    e.preventDefault();

    firebase.items(group.uid, category.uid).add({
      title: newItemTitle,
      createdAt: firebase.fieldValue.serverTimestamp(),
    });
  };
  console.log("items", items);

  return (
    <div>
      Category Title: {category.title}
      <ul>
        {items && items.map((item) => <li key={item.uid}>{item.title}</li>)}
      </ul>
      <form action="" onSubmit={onCreateItem}>
        <input type="text" onChange={(e) => setNewItemTitle(e.target.value)} />
        <button onClick={onCreateItem}>submit</button>
      </form>
    </div>
  );
};

Items.propTypes = {};

export default Items;
