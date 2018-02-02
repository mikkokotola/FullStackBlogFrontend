let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "EkaBlogi",
    author: "Eka Kirjoittaja",
    url: "www.eka.org",
    likes: 5,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "omistaja",
      name: "Olli Omistaja"
    }
  },
  {
    id: "5a451df7571c224a31b5c8cf",
    title: "TokaBlogi",
    author: "Toka Kirjoittaja",
    url: "www.toka.org",
    likes: 5,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "omistaja",
      name: "Olli Omistaja"
    }
  },
  {
    id: "5a451df7571c224a31b5c8cg",
    title: "KolmasBlogi",
    author: "Kolmas Kirjoittaja",
    url: "www.kolmas.org",
    likes: 2,
    user: {
      _id: "5a437a9e514ab7f168ddf139",
      username: "totti",
      name: "Totti Toinen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }
