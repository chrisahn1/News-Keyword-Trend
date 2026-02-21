function CheckboxNews({ newsCheckboxList, handleChange }) {
  return (
    <div className="checkboxnewsContainer">
      <label>
        <input
          type="checkbox"
          name="cnn.com"
          checked={newsCheckboxList.cnn}
          onChange={handleChange}
        />
        CNN
      </label>
      <label>
        <input
          type="checkbox"
          name="associatedpress.com"
          checked={newsCheckboxList.associatedpress}
          onChange={handleChange}
        />
        Associated Press
      </label>
      <label>
        <input
          type="checkbox"
          name="thewashingtonpost.com"
          checked={newsCheckboxList.thewashingtonpost}
          onChange={handleChange}
        />
        The Washington Post
      </label>
      <label>
        <input
          type="checkbox"
          name="cbsnews.com"
          checked={newsCheckboxList.cbsnews}
          onChange={handleChange}
        />
        CBS News
      </label>
      <label>
        <input
          type="checkbox"
          name="abcnews.com"
          checked={newsCheckboxList.abcnews}
          onChange={handleChange}
        />
        ABC News
      </label>
      <label>
        <input
          type="checkbox"
          name="bccnews.com"
          checked={newsCheckboxList.bccnews}
          onChange={handleChange}
        />
        BCC News
      </label>
      <label>
        <input
          type="checkbox"
          name="foxnews.com"
          checked={newsCheckboxList.foxnews}
          onChange={handleChange}
        />
        Fox News
      </label>
      <label>
        <input
          type="checkbox"
          name="msnbc.com"
          checked={newsCheckboxList.msnbc}
          onChange={handleChange}
        />
        MSNBC
      </label>
      <label>
        <input
          type="checkbox"
          name="nbcnews.com"
          checked={newsCheckboxList.nbcnews}
          onChange={handleChange}
        />
        NBC News
      </label>
      <label>
        <input
          type="checkbox"
          name="thehill.com"
          checked={newsCheckboxList.thehill}
          onChange={handleChange}
        />
        The Hill
      </label>
    </div>
  );
}

export default CheckboxNews;
