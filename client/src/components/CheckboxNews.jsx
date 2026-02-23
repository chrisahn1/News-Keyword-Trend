function CheckboxNews({ newsCheckboxList, handleChange }) {
  return (
    <div className="checkboxnewsContainer">
      <label>
        <input
          type="checkbox"
          name="apnews.com"
          checked={newsCheckboxList.apnews}
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
          name="bbc.com"
          checked={newsCheckboxList.bbc}
          onChange={handleChange}
        />
        BBC
      </label>
    </div>
  );
}

export default CheckboxNews;
