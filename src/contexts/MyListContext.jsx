import { createContext, useContext, useState } from 'react'

const MyListContext = createContext(null)

export const useMyList = () => {
  const context = useContext(MyListContext)
  if (!context) {
    throw new Error('useMyList must be used within MyListProvider')
  }
  return context
}

// Katalog lengkap semua film yang tersedia
const availableMovies = [
  {
    id: 1,
    title: 'All of Us Are Dead',
    image: '/images/poster4.png',
    alt: 'All of Us Are Dead',
    hasNewEpisode: true,
    isTop10: true
  },
  {
    id: 2,
    title: 'Baymax',
    image: '/images/poster5.png',
    alt: 'Baymax',
    hasNewEpisode: false,
    isTop10: false
  },
  {
    id: 3,
    title: 'My Hero Academia',
    image: '/images/poster1.png',
    alt: 'My Hero Academia',
    hasNewEpisode: true,
    isTop10: false
  },
  {
    id: 4,
    title: 'Blue Lock',
    image: '/images/poster3.png',
    alt: 'Blue Lock',
    hasNewEpisode: true,
    isTop10: false
  },
  {
    id: 5,
    title: 'Ted Lasso',
    image: '/images/poster7.png',
    alt: 'Ted Lasso',
    hasNewEpisode: true,
    isTop10: true
  },
  {
    id: 6,
    title: 'Duty After School',
    image: '/images/poster12.png',
    alt: 'Duty After School',
    hasNewEpisode: true,
    isTop10: true
  },
  {
    id: 7,
    title: 'Suzume',
    image: '/images/poster1.png',
    alt: 'Suzume',
    hasNewEpisode: false,
    isTop10: true
  },
  {
    id: 8,
    title: 'Guardians of the Galaxy',
    image: '/images/poster8.png',
    alt: 'Guardians of the Galaxy',
    hasNewEpisode: false,
    isTop10: true
  },
  {
    id: 9,
    title: 'Spider-Man',
    image: '/images/poster6.png',
    alt: 'Spider-Man',
    hasNewEpisode: false,
    isTop10: false
  },
  {
    id: 10,
    title: 'Sonic 2',
    image: '/images/poster9.png',
    alt: 'Sonic 2',
    hasNewEpisode: false,
    isTop10: false
  },
  {
    id: 11,
    title: 'Megan',
    image: '/images/poster10.png',
    alt: 'Megan',
    hasNewEpisode: false,
    isTop10: false
  },
  {
    id: 12,
    title: 'Dilan 1991',
    image: '/images/poster11.png',
    alt: 'Dilan 1991',
    hasNewEpisode: false,
    isTop10: false
  },
  {
    id: 13,
    title: 'The Last of Us',
    image: '/images/poster1.png',
    alt: 'The Last of Us',
    hasNewEpisode: true,
    isTop10: true
  },
  {
    id: 14,
    title: 'Wednesday',
    image: '/images/poster2.png',
    alt: 'Wednesday',
    hasNewEpisode: true,
    isTop10: true
  },
  {
    id: 15,
    title: 'Stranger Things',
    image: '/images/poster3.png',
    alt: 'Stranger Things',
    hasNewEpisode: false,
    isTop10: true
  }
]

export const MyListProvider = ({ children }) => {
  // Daftar film yang sudah ditambahkan user (dimulai dengan beberapa film)
  const [myListMovies, setMyListMovies] = useState([
    {
      id: 1,
      title: 'All of Us Are Dead',
      image: '/images/poster4.png',
      alt: 'All of Us Are Dead',
      hasNewEpisode: true,
      isTop10: true
    },
    {
      id: 2,
      title: 'Baymax',
      image: '/images/poster5.png',
      alt: 'Baymax',
      hasNewEpisode: false,
      isTop10: false
    },
    {
      id: 3,
      title: 'My Hero Academia',
      image: '/images/poster1.png',
      alt: 'My Hero Academia',
      hasNewEpisode: true,
      isTop10: false
    },
    {
      id: 4,
      title: 'Blue Lock',
      image: '/images/poster3.png',
      alt: 'Blue Lock',
      hasNewEpisode: true,
      isTop10: false
    },
    {
      id: 5,
      title: 'Ted Lasso',
      image: '/images/poster7.png',
      alt: 'Ted Lasso',
      hasNewEpisode: true,
      isTop10: true
    },
    {
      id: 6,
      title: 'Duty After School',
      image: '/images/poster12.png',
      alt: 'Duty After School',
      hasNewEpisode: true,
      isTop10: true
    },
    {
      id: 7,
      title: 'Suzume',
      image: '/images/poster1.png',
      alt: 'Suzume',
      hasNewEpisode: false,
      isTop10: true
    },
    {
      id: 8,
      title: 'Guardians of the Galaxy',
      image: '/images/poster8.png',
      alt: 'Guardians of the Galaxy',
      hasNewEpisode: false,
      isTop10: true
    },
    {
      id: 9,
      title: 'Spider-Man',
      image: '/images/poster6.png',
      alt: 'Spider-Man',
      hasNewEpisode: false,
      isTop10: false
    },
    {
      id: 10,
      title: 'Sonic 2',
      image: '/images/poster9.png',
      alt: 'Sonic 2',
      hasNewEpisode: false,
      isTop10: false
    },
    {
      id: 11,
      title: 'Megan',
      image: '/images/poster10.png',
      alt: 'Megan',
      hasNewEpisode: false,
      isTop10: false
    },
    {
      id: 12,
      title: 'Dilan 1991',
      image: '/images/poster11.png',
      alt: 'Dilan 1991',
      hasNewEpisode: false,
      isTop10: false
    }
  ])

  // CRUD Operations following reference repository patterns

  // Delete: Using .filter() to remove item by id
  const handleDelete = (id) => {
    setMyListMovies(myListMovies.filter(movie => movie.id !== id))
  }

  // Add: Using spread operator to add movie from catalog
  const handleAdd = (movieId) => {
    const movieToAdd = availableMovies.find(movie => movie.id === movieId)
    if (movieToAdd && !myListMovies.find(m => m.id === movieId)) {
      setMyListMovies([...myListMovies, movieToAdd])
    }
  }

  // Update: Using .map() to update specific item by id
  const handleUpdate = (id, updatedData) => {
    setMyListMovies(myListMovies.map(movie => 
      movie.id === id ? { ...movie, ...updatedData } : movie
    ))
  }

  // Check if movie is already in user's list
  const isInMyList = (movieId) => {
    return myListMovies.some(movie => movie.id === movieId)
  }

  const value = {
    myListMovies,
    availableMovies,
    handleDelete,
    handleAdd,
    handleUpdate,
    isInMyList
  }

  return (
    <MyListContext.Provider value={value}>
      {children}
    </MyListContext.Provider>
  )
}