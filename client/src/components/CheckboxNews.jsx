function CheckboxNews({ newsCheckboxList, handleChange }) {
  return (
    <div className="checkboxnewsContainer">
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
          name="cnn.com"
          checked={newsCheckboxList.cnn}
          onChange={handleChange}
        />
        CNN
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
    </div>
  );
}

export default CheckboxNews;
