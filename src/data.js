import axios from "axios"
import { useEffect, useState } from "react"
import TodoComp from "./task"
import UserComp from "./user"
import PostComp from './post';
import TodoUserComp from './user-task';

const DataComp = (props) => {
    const [user , setUsers] = useState([])
    const [post , setPosts] = useState([])
    const [todo , setTodos] = useState([])
    const [searchTerm , setSearchTerm] = useState("")
    const [showAddNew , setShowAddNew] = useState(false)
    const [newUser, setNewUser] = useState({name : "" , email : ""});
    const [newUsers, setNewUsers] = useState([]);


    useEffect(async () => {
        let resp = await axios.get("https://jsonplaceholder.typicode.com/users")
        setUsers(resp.data)
    }, [])

    useEffect(async () => {
        let resp = await axios.get("https://jsonplaceholder.typicode.com/todos")
        setTodos(resp.data)
    }, [])

    useEffect(async () => {
        let resp = await axios.get("https://jsonplaceholder.typicode.com/posts")
        setPosts(resp.data)
    }, [])

    const createUser = async (e) =>
    {
       if(newUser.name == "" || newUser.email == "") {
           alert("Please fill all fields")
       } else {
      e.preventDefault()
      let resp = await axios.post("http://jsonplaceholder.typicode.com/users", newUser);
      setNewUsers(resp.data)
      console.log(resp.data);
      alert("Congratulations you have a new user!" + "\n" +
      "Name: " + newUser.name + "\n" +
      "Email: " + newUser.email)
    }}

    return(
        <div>
            <div>
            <input className="search" type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)}/>
            <input className="addUser" type="button" value="Add" onClick={() => setShowAddNew(!showAddNew)}/>
                {
                    user.filter(item => {
                        if(searchTerm == "") {
                          return item
                        } else if(item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                          return item
                        }
                      }).map((item,index) => {
                        return <UserComp key={item.id} id={index} setUsers={setUsers} user={item} posts={post} todos={todo} newUserbutton={showAddNew} newUser={newUsers}/>
                    })
                }
            {showAddNew &&
              <div className="addNewUser">
                  <h3>Add New User</h3>
                  <div className="newUser">
                  <input className="newuserinput" placeholder="Name" type="text" name="name" onChange={e => setNewUser({...newUser, name : e.target.value})}/> <br/>
                  <input className="newuserinput" placeholder="Email" type="email" name="email" onChange={e => setNewUser({...newUser, email : e.target.value})}/> <br/>
                  <div className="newuserbutton">
                <input className="addUserButtons" type="submit" value="Add"  onClick={createUser}/>
                <input className="addUserButtons" type="button" value="Cancel" onClick={() => setShowAddNew(!showAddNew)} />
                </div>
                </div>
              </div>
            }
            </div>
        </div>
    )
}

export default DataComp;