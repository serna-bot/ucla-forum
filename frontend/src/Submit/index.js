import React from 'react';
import Select from 'react-select';
import { useEffect, useState } from "react";
import "./Submit.scss";
import {getCategories} from "../shared/categories.js"
import * as api from '../api/index.js';

function Submit() {
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [chosenCategory, setCategory] = useState();
    const categories = getCategories();
    useEffect(() => {
        //TODO
    }, []);

    const handleDropdownChange = (chosenCategory) => {
        setCategory(chosenCategory.value);
    };

    async function submitPost() {
      const post = {
        title: title,
        desc: desc,
        category: chosenCategory,
      };

      try {
        const { data } = await api.createPost(post);
        window.location.href = `/posts`;
        console.log("Posted!");
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
      
    }

    return (
        <div id="submit-page" className="App">
            <div id="title" className="form-input-container">
                <label htmlFor="title-input">Title:</label>
                <input type="text"
                    name="title"
                    id="title-input"
                    placeholder="Write a title..."
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div id="description" className="form-input-container">
                <textarea rows="10"
                    name="description"
                    id="description-input"
                    placeholder="Write a post..."
                    onChange={(e) => setDesc(e.target.value)}
                ></textarea>
            </div>
            <Select
                // chosenCategory={chosenCategory}
                options={categories}
                openMenuOnClick={false}
                placeholder="You Must Choose a Category"
                onChange={handleDropdownChange}
            />
            <button id="submit-button" type="submit" onClick={submitPost}>Submit</button>
        </div>
    );
}

export default Submit;