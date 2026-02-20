function CheckboxNews({ newsListInput, handleChange, handleSubmitNews }) {
  return (
    <div className="checkboxnewsContainer">
      <form className="checkboxnews" onSubmit={handleSubmitNews}>
        <label>
          <input
            type="checkbox"
            name="cnn.com"
            checked={newsListInput.cnn}
            onChange={handleChange}
          />
          CNN
        </label>
        <label>
          <input
            type="checkbox"
            name="associatedpress.com"
            checked={newsListInput.associatedpress}
            onChange={handleChange}
          />
          Associated Press
        </label>
        <label>
          <input
            type="checkbox"
            name="thewashingtonpost.com"
            checked={newsListInput.thewashingtonpost}
            onChange={handleChange}
          />
          The Washington Post
        </label>
        <label>
          <input
            type="checkbox"
            name="cbsnews.com"
            checked={newsListInput.cbsnews}
            onChange={handleChange}
          />
          CBS News
        </label>
        <label>
          <input
            type="checkbox"
            name="abcnews.com"
            checked={newsListInput.abcnews}
            onChange={handleChange}
          />
          ABC News
        </label>
        <label>
          <input
            type="checkbox"
            name="bccnews.com"
            checked={newsListInput.bccnews}
            onChange={handleChange}
          />
          BCC News
        </label>
        <label>
          <input
            type="checkbox"
            name="foxnews.com"
            checked={newsListInput.foxnews}
            onChange={handleChange}
          />
          Fox News
        </label>
        <label>
          <input
            type="checkbox"
            name="msnbc.com"
            checked={newsListInput.msnbc}
            onChange={handleChange}
          />
          MSNBC
        </label>
        <label>
          <input
            type="checkbox"
            name="nbcnews.com"
            checked={newsListInput.nbcnews}
            onChange={handleChange}
          />
          NBC News
        </label>
        <label>
          <input
            type="checkbox"
            name="thehill.com"
            checked={newsListInput.thehill}
            onChange={handleChange}
          />
          The Hill
        </label>
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
}

export default CheckboxNews;
