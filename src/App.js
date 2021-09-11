import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Container, withStyles, Switch } from '@material-ui/core'
import Header from './components/Header/Header'
import Definitions from './components/Definitions/Definitions'
import {grey} from '@material-ui/core/colors'

function App() {
  const [word, setWord] = useState("")
  const [meanings, setMeanings] = useState([])
  const [category, setCategory] = useState('en')
  const [LightTheme, setLightTheme] = useState(false)

  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      )

      console.log(data)

      setMeanings(data.data)


    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    dictionaryApi()
    // eslint-disable-next-line
  }, [word, category])

  return (
    <div className="App" style={{ height: '100vh', backgroundColor: LightTheme? '#c6c7cc': '#282c34', color: LightTheme? 'black': 'white', transition: 'all 0.5s ease-out' }}>
      <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-evenly'}}>
        <div style={{ position: 'absolute', top: 0, right: 15, paddingTop: 10 }}>
          <span>{LightTheme? 'Light': 'Dark'}</span>
          <DarkMode checked={LightTheme} onChange={() => setLightTheme(!LightTheme)} />
        </div>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          LightTheme={LightTheme}
        />
        {meanings && (
          <Definitions
            meanings={meanings}
            word={word}
            LightTheme={LightTheme}
            category={category}
          />
        )}
      </Container>
    </div>
  )
}

export default App
