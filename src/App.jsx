import { useState, useEffect } from 'react'
import './App.css'

const photoNotes = {
  10: "Ema aastal 1956 aug.\nSuri 25. aug. 1956\n\nSalme Koorits",
  16: "Vanaema (isa ema)",
  19: "2. juuni 1979 a.\nAsti juubel.",
  29: "10. aastane Toivo\n1955",
  39: "Tiiu, Küllike ja Jaanika. Aprill 1976",
  43: "Siina ja Lembit\n4. dets. 1943"
}

function Gallery() {
  const totalPhotos = 49
  const [currentPhoto, setCurrentPhoto] = useState(1)
  const [isFlipped, setIsFlipped] = useState(false)

  const nextPhoto = () => {
    setCurrentPhoto(prev => prev === totalPhotos ? 1 : prev + 1)
    setIsFlipped(false)
  }

  const prevPhoto = () => {
    setCurrentPhoto(prev => prev === 1 ? totalPhotos : prev - 1)
    setIsFlipped(false)
  }

  const handlePhotoClick = () => {
    if (photoNotes[currentPhoto]) {
      setIsFlipped(!isFlipped)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'Escape') setIsFlipped(false)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const currentNote = photoNotes[currentPhoto]

  return (
    <div className="gallery">
      <h1 className="gallery-title">Mälestused</h1>
      
      <div className="photo-viewer">
        <div className="photo-container">
          <img 
            src={`./photos/${currentPhoto}.png`} 
            alt={`Family photo ${currentPhoto}`}
            className="main-photo"
            onClick={handlePhotoClick}
            style={{ cursor: currentNote ? 'pointer' : 'default' }}
            onError={(e) => {
              console.error(`Failed to load image: ./photos/${currentPhoto}.png`);
              e.target.style.border = '2px solid red';
            }}
            onLoad={() => {
              console.log(`Successfully loaded image: ./photos/${currentPhoto}.png`);
            }}
          />
          {currentNote && !isFlipped && (
            <div className="flip-hint">
              📝
            </div>
          )}
          {currentNote && isFlipped && (
            <div className="note-display">
              <p className="note-text">{currentNote}</p>
              <button 
                className="back-button"
                onClick={handlePhotoClick}
              >
                ← Tagasi
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="photo-info">
        <button 
          className="nav-button nav-button-left" 
          onClick={prevPhoto}
          title="Previous photo"
        >
          ‹
        </button>
        
        <span className="photo-counter">
          {currentPhoto} / {totalPhotos}
        </span>
        
        <button 
          className="nav-button nav-button-right" 
          onClick={nextPhoto}
          title="Next photo"
        >
          ›
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Gallery />
    </div>
  )
}

export default App
