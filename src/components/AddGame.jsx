import React, {useState} from 'react'
import './AddGame.css'
import NavbarCP from './Navbar'
import axios from 'axios'

const AddGame = () => {
    
    const [nameofGame, setNameofGame] = useState('');
    const [date,setDate] =useState('');
    const [rating,setRating] = useState(0.0);
    const [summary, setSummary] = useState('');
    

    // const  handleReq = async () => {

    // }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        // alert(nameofGame +' ' + rating)
        
        try {
            const {data} = await axios.post('https://spa.api.logicloop.io/api/games', {
                data:{
                    firstReleaseDate:date,
                    name:nameofGame,
                    rating:rating,
                    summary:summary,
                },
                
            },{
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              alert('Added successfully');
              

        } catch (error) {
            alert(error)
        }
      
    }

  return (

    <div className="addgame-container">
            <div className="contact-page-container">
      <div className="nav-container">
        <NavbarCP />
      </div>
      <div className="cp-title">
        <h2>Add a game</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta excepturi dolorem quae amet quasi delectus adipisci aspernatur? Necessitatibus odio vitae natus culpa voluptate nostrum. Fuga doloremque quas doloribus sunt neque.</p>
      </div>
      <div className="contact-form">
        <form onSubmit={(e)=>{handleSubmit(e)}} className="form">
         
          <p>Contact Form</p>
          
          <div className="input-group">
            <div className="input-container">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" onChange={(e)=>{setNameofGame(e.target.value)}}/>
            </div>
            <div className="input-container">
              <label htmlFor="">First Release date</label>
              <input type="date" id="date-ag" name="date" onChange={(e)=>{setDate(e.target.value)}}/>
            </div>
            <div className="input-container">
              <label htmlFor="">Rating</label>
              <input type="number" id="date-ag" name="rating" onChange={(e)=>{setRating(e.target.value)}}/>
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="">Summary</label>
            <input id="message" name="message" rows="6" onChange={(e)=>{setSummary(e.target.value)}}/>
          </div>
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default AddGame