import { React, Component } from 'react';
import axios from 'axios';

class Clock extends Component {
        constructor(props) {
          super(props);
          this.state = {
            getTime: this.getTime(),
            quote: '',
            author: ''
          }
        }
        
        componentDidMount() {
          this.setTimer();
          this.getQuote()
        }

        componentWillUnmount() {
          if(this.timeout) {
            clearTimeout(this.timeout);
          }
        }
      
        setTimer() {
          //clearTimeout(this.timeout); //this will be in componentWillUnmount()
          this.timeout = setTimeout(this.updateClock.bind(this), 0);
        }
      
        updateClock() {
          this.setState(this.getTime, this.setTimer);
        }
    
       getQuote() {
        let url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

        axios.get(url)
           .then(res => {
              let data = res.data.quotes
              let quoteNum = Math.floor(Math.random() * data.length)
              let randomQuote = data[quoteNum]
  
              this.setState({
                 quote: randomQuote['quote'],
                 author: randomQuote['author']
              })
           })
       }
      
        getTime() {
          const currentTime = new Date();
          return {
            hours: currentTime.getHours(),
            minutes: currentTime.getMinutes(),
            seconds: currentTime.getSeconds(),
            ampm: currentTime.getHours() >= 12 ? 'pm' : 'am'
          }
        }
      
        render() {
          const {hours, minutes, seconds, ampm} = this.state;
          return (
            <div className="container py-20 h-screen max-w-screen-2xl flex flex-col justify-between items-center bg-green-300 bg-opacity-60 bg-cover" style={{backgroundImage: `url('https://source.unsplash.com/random')`,backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <div className="clock h-28 text-4xl flex justify-center items-center w-8/12 text-white font-bold bg-gray-600 bg-opacity-60 rounded-md">
              {hours === 0 ? 12 : hours > 12 ? hours - 12 : hours}:
              {minutes > 9 ? minutes : `0${minutes}`}:
              {seconds > 9 ? seconds : `0${seconds}`} {ampm}
            </div>
            <div className="bg-white mt-10 w-8/12 bg-opacity-60 rounded-md p-7 items">
            <div id='text'><p>{this.state.quote}</p></div>
               <div id='author' className="flex justify-end"><h5>-{this.state.author}</h5></div>
            </div>
            </div>
          );
        }
      }
    
 
export default Clock;