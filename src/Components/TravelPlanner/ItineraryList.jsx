//ItineraryList.jsx
//child component- displays list of itinerary items
//receives items and onDeleteItem via props from parent

function ItineraryList({ items, onDeleteItem }) {
    //show message if no items yet
    if (!items || items.length === 0) {
      return <p>No itinerary items yet.</p>;
    }
  
    return (
      <div>
        <h2>Itinerary</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.title}
              <button
                onClick={() => onDeleteItem(item.id)}
                style={{ marginLeft: 8 }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ItineraryList;