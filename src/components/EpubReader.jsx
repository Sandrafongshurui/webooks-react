import React, { useRef, useState, useEffect } from 'react'
// import "./styles.css";
import { ReactReader } from 'react-reader'
// import Ebook from "./epub/sample.epub";
import axios from 'axios'
import { Box, Button} from '@mui/material'
import { List } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import ebook from '../assets/Little-Women.epub'

// const ownStyles = {
//   ...ReactReaderStyle,
//   arrow: {
//     ...ReactReaderStyle.arrow,
//     color: "red",
//   },
// };

//const loc = "epubcfi(/6/4[chapter1]!/4/2[chapter1]/8[s3]/6/1:490)";
// const loc = null;

export const EpubReader = () => {
  const navigate = useNavigate()
  const { loanId, bookId } = useParams()
  const [selections, setSelections] = useState([])
  const [data, setData] = useState(null)
  //rendition Displays an Epub as a series of Views for each Section
  const renditionRef = useRef(null)
  const [location, setLocation] = useState(null)

  ///location changes gets called on very first render
  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub.
    //It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    // if(bookmark === "0"){
    //   if (renditionRef.current) {
    //     console.log(renditionRef.current.location.start.cfi)
    //     setBookmark(renditionRef.current.location.start.cfi)
    //   }
    // }else{
    //   setLocation("epubcfi(/6/14!/4/2/20/1:142)")
    // }
    setLocation(epubcifi)
    console.log(location)
    console.log(epubcifi)
  }
  //fetch api for get epub

  useEffect(() => {
    
    const fetchApi = async () => {
      console.log('fetch')
      const res = await axios.get(
        `https://${process.env.REACT_APP_SERVER_URL}/api/v1/loan/${loanId}/book/${bookId}/open`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      if (res.status === 200 || res.status === 201) {
        const bookData = await res.data
        console.log('data', bookData)
        setData(bookData)
        if (bookData.bookProgress !== '0') {
          setLocation(bookData.bookProgress)
        }
      }
    }
    fetchApi()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
   
    // a ref will return a current, once selection is made do this
    console.log('--->', renditionRef.current)
    //current points value of the ref, which was set in react reader getRendition props
    //which is the rendition of this book
    if (renditionRef.current) {
      //setting the annotation part, from which content section
      const setRenderSelection = (cfiRange, contents) => {
        //add in the selections array, arry.concat returns a new array, push returns the length.
        //so immmediately set in the selections
        setSelections(
          selections.concat({
            // this gets the actual annottation text
            text: renditionRef.current.getRange(cfiRange).toString(),
            page: cfiRange,
            loanId: parseInt(loanId)
          }),
        )
        console.log(
          '1',
          cfiRange,
          contents,
          renditionRef.current.getRange(cfiRange).toString(),
        )
        console.log('2', renditionRef)
        console.log('3', selections)
        //epub.js function that adds to the array pf highlight, underline or marl
        renditionRef.current.annotations.add(
          'highlight', //type of annotation
          cfiRange, //cfirange to to attache the annotation to
          {}, //data to attach annottaion to
          null, //cb to impelement after adding
          'hl', //class name to assign to annotation
          {
            //css stylesfor annotation
            fill: 'yellow',
            'fill-opacity': '0.5',
          },
        )
        //for the dom,
        //returns a Selection object representing the range of text selected by the user or the current position in dom
        //can hv multiple range instances, but only can get 1 selection per doc
        //remove old ranges that are currently selected.
        contents.window.getSelection().removeAllRanges()
      }
      //console.log(renditionRef.current.location)
      //trigger the setRenderSelection()
      renditionRef.current.on('selected', setRenderSelection)
      console.log(selections)
      //must off immediately, if not will keep rerender because is seting the selections
      return () => {
        renditionRef.current.off('selected', setRenderSelection)
      }
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelections, selections])

  // const clickBookmark = () => {
  //   setBookmark(location)
  // }
  const closeBook = async () => {
    console.log('Exit epubcifi:', location)
    console.log('Highlights:', selections)
    const data = {
      bookProgress: location,
      annotationArry: selections,
    }
    try {
      const res = await axios.patch(
        `https://${process.env.REACT_APP_SERVER_URL}/api/v1/loan/${loanId}/book/${bookId}/close`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      if (res.status === 200 || res.status === 201) {
        console.log('Updated, book pregress')
        navigate('/bookshelf/loans')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box>
      {/* <Button onClick={clickBookmark}>Bookmark</Button> */}
      <Button onClick={closeBook}>Exit</Button>
      {data && (
        <Box style={{ height: '100vh' }}>
          <ReactReader
            location={location}
            // their props is passing the epubcifi info
            locationChanged={locationChanged}
            url={"https://storage.googleapis.com/webooks-epub/The-Secret-Adversary.epub"}
            //url={"https://gerhardsletten.github.io/react-reader/files/alice.epub"}
            //url={"https://webooks-epub-files.s3.amazonaws.com/The-Secret-Adversary.epub"}
            //url={ebook}
            //   styles={ownStyles}
            getRendition={(rendition) => {
              //rendtion is gotten from this inbuilt props fucntion
              console.log('getrendition')
              renditionRef.current = rendition
              renditionRef.current.themes.default({
                '::selection': {
                  background: 'yellow',
                },
              })
              // set selections as empty array first, cos no seletion has been made
              //change to the data selections
              setSelections([])
            }}
          />
        </Box>
      )}
      {/* highlights */}
      <Box
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          zIndex: 1,
          backgroundColor: 'blue',
        }}
      >
        <Box>
          <List>
            {selections.map(({ text, page }, i) => (
              <li key={i}>
                {text} {/* click the show button, brings to to the cfiRange */}
                <button
                  onClick={() => {
                    console.log(page)
                    renditionRef.current.display(page)
                  }}
                >
                  Show
                </button>
                <button
                  onClick={() => {
                    renditionRef.current.annotations.remove(
                      page,
                      'highlight',
                    )
                    setSelections(selections.filter((item, j) => j !== i))
                  }}
                >
                  x
                </button>
              </li>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}
