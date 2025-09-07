import { useState, useEffect } from 'react'
import './App.css'

const photoNotes = {
  1: "Heiki, tema naine Ene ja Hedda, vbl 1967",
  2: "Toivo isa vend Gerhard, minu ema ja Isa",
  3: "Toivo arvan vbl 18",
  4: "keskmised 3 Toivo ema õe Leida tütar Siiri, tema mees Janno ja ema vend Ferdinand (onu Värdi, kinkis Toivole 4 kilose tõukekuuli ja esimese kitarri)",
  5: "Heiki isa süles, vbl 1943/44",
  6: "Toivo emaga, ei taha eriti pildistamist.",
  7: "Udo noorelt surnud õde, onu Gerhard (meie keeli Jähhard) ja Udo",
  8: "Heiki lintmakk Dnepr 5, kui tema sõjaväes oli (Tamme pst)",
  9: "Näide 1950/60 ndate raskest okuptsiooni- ja näljaajast🤣🤣.",
  10: "Minu ema ema Salme, hääbus vaikselt oma kööktoas Salme tänaval 7, maja praegu alles.",
  11: "Pilt 11 on vanaema Rita õe Astridi laulatus Aksel Ausmeelega",
  12: "Meil oli kunagi ajutiselt tiibklaver kui keegi perekonnatuttav maja ehitas, me Heddaga mõlemad mängisime😁",
  13: "Peaks olema minu vanavanaema, aga kas emapoolse vanaema või vanaisa ema, seda ei tea. pildil nr. 10 haigevoodis lamava minu vanaema Salme ema Anna",
  14: "Udo ja Elfriede, vbl abielludes 1942 sõja ajal.",
  15: "Meie maja, sajandit ei julge pakkuda",
  16: "Minu isa ema Helene Alma Wihelmine",
  17: "Ema õe Leida tütred Siiri ja Eevi, ema õde Astrid, ema, emaema Salme õetütar Aino ja viimast ei tea",
  18: "Ema töökaaslasega müümas",
  19: "2. juuni 1979. Asti juubel. Pildil 17 rahvale lisaks Astridi mees Aksel, tema poeg ja tütar koeraga",
  20: "Ema Rita",
  21: "Hedda sünna raskel okupatsiooniajal",
  22: "Vasakul vist Toivo aga pole kindel",
  23: "Heiki, Toivo ja onu Hans",
  24: "Isa Udo vbl 30ndatel",
  25: "Toivo ~21-23",
  26: "Ivar lasteaias",
  27: "Toivo 19/22",
  28: "Isa loeb Edasit ja Hedda ärkab.",
  29: "Toivo vist praeguse mõiste järgi põhikoolis.",
  30: "Isaisa  ( Richard Wilhelm Corneliuse) juures külas, peale meie ka taksojuht ja keegi proua.",
  31: "Küllike Ivari süles vist Võrtsu ääres.",
  32: "Udo, Rite ja tädi Evi oma mehega.",
  33: "Aksel ja ema noorem õde Astrid (tädi Asti, kes Toivole ja Heddale klaverimängu õpetas) oma pulmas meie tamme suures toas.",
  34: "Richard ja tema teine naine Pauline st. onu Hansu ema, Heiki, Hans ja kogu meie pere.",
  35: "Tädi Asti pulm kestab.",
  36: "Toivo ja sõber Vidri (Hendrik) keskkooli viimane klass arvan.",
  37: "Siiri ja Janno pulmad.",
  38: "Siiri ja Janno pulmad",
  39: "Tiiu, Küllike ja Jaanika (Aprill 1976).",
  40: "Paremal pool on Eevi, Siiri ja Anne",
  41: "Siiri oma kahe lapsega",
  42: "Paremal pool on Eevi Siiri ja Anne",
  43: "Siina ja Lembit\n4. dets. 1943",
  44: "Toivo miski kasvueas tiinekas pioneerilaagrisõbraga",
  45: "Ema",
  46: "Asti pulm jätkub, esiplaanil Eevi.",
  47: "Vist pulm ikka, esiplaanil ema, näpuga vehib vanem õde Leida",
  48: "Täditütar Siiri oma lastega",
  49: "Eevi, tädi Leida, Siiri, tädi Asti ja onu Värdi oma naisega."
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
