function DaysRange({ dayRange, setDayRange }) {
  return (
    <div className="dayrange">
      <label>
        Select Number of Days:
        <select value={dayRange} onChange={(e) => setDayRange(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </label>
    </div>
  );
}

export default DaysRange;
