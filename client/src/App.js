import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import { useEffect, useState } from 'react'
import Auth from'./components/Auth'
import { useCookies, withCookies } from 'react-cookie'
import validator from 'validator'

const App = ({cookies}) => {
  const [cookie, setCookie, removeCookie] = useCookies(null)
  const authToken = cookie.AuthToken
  const userEmail = cookie.Email
  const [tasks, setTasks] = useState(null)
  
  const getData = async () => {
    const URL = `http://localhost:8000/getTodos/${userEmail}`;
    try {
      const response = await fetch(URL);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData()
    }}, [])

  // sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

  const handleSignOut = () => {
    cookies.remove('Email', {path: '/'})
    cookies.remove('AuthToken', {path: '/'})
    console.log('clicked')
  }

  return (
    <div className='app'>
      {!authToken && <Auth />}
      {authToken && 
      
      <ListHeader listName={'Holiday tick list'} getData={getData} handleSignOut={handleSignOut}/>
       }
       <p className='user-email'>Welcome back {userEmail && validator.escape(userEmail) ? userEmail : ''}</p>
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
    </div>
  );
}

export default withCookies(App);
