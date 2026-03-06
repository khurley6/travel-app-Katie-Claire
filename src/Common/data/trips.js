//trips.js
//local data file acting as our JSON database (from feature 3)
//has a sample trip used by the custom service

const trips = [
    {
      id: "t1",
      name: "Napa Weekend",
      destination: "Napa",
      startDate: "2026-05-10",
      days: 3,
      style: "relax",
      items: [
        {
          id: "i1",
          day: 1,
          time: "10:00",
          title: "Winery tour",
          category: "activity",
        },
        {
          id: "i2",
          day: 2,
          time: "13:00",
          title: "Lunch at Farmstead",
          category: "food",
        },
      ],
    },
    {
      id: "t2",
      name: "Tokyo Adventure",
      destination: "Tokyo",
      startDate: "2026-08-01",
      days: 10,
      style: "adventure",
      items: [
        {
          id: "i3",
          day: 1,
          time: "09:00",
          title: "Senso-ji Temple",
          category: "sightseeing",
        },
        {
          id: "i4",
          day: 1,
          time: "19:00",
          title: "Ramen in Shinjuku",
          category: "food",
        },
      ],
    },
  ];
  
  export default trips;