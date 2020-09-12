import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, Switch, Route } from "react-router-dom";
import Items from "./Items";
import * as ROUTES from "../constants/routes";
import Categories from "./Categories";

const CategoriesPage = ({ group, match, firebase, authUser }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryTitle, setNewCategoryTitle] = useState(true);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = firebase
      .categories(group.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          let categories = [];
          snapshot.forEach((doc) =>
            categories.push({ ...doc.data(), uid: doc.id })
          );

          setLoading(false);
          setCategories(categories.reverse());
        } else {
          setLoading(false);
          setCategories([]);
        }
      });

    return () => {
      unsubscribe();
    };
  }, [firebase, group.uid, match.params.categoryId]);

  return (
    <div>
      {loading && <div>Loading ...</div>}

      {categories && (
        <Switch>
          <Route
            path={ROUTES.ITEMS}
            render={(routerProps) => {
              const categoryId = routerProps.match.params.categoryId;
              const category = categories.find((g) => g.uid === categoryId);

              if (category) {
                return (
                  <Items
                    group={group}
                    category={category}
                    firebase={firebase}
                    authUser={authUser}
                    {...routerProps}
                  />
                );
              }
            }}
          />

          <Route
            path={ROUTES.CATEGORIES}
            render={(routerProps) => {
              return (
                <Categories
                  group={group}
                  firebase={firebase}
                  categories={categories}
                  {...routerProps}
                />
              );
            }}
          />
        </Switch>
      )}
    </div>
  );
};

CategoriesPage.propTypes = {};

export default CategoriesPage;
