import axios from "axios";
import { useEffect, useState } from "react";
import PostComp from "./post";
import TodoComp from "./task";

const UserComp = (props) => {
  const [isExist, setShowRightSide] = useState(false);
  const [otherData, setOtherData] = useState(false);
  const [newTodo, setNewTodo] = useState(false);
  const [userUpdate, setUserUpdate] = useState([])
  const [newTask , setNewTask] = useState({title : ""})
  const [newPost, setNewPost] = useState({title : "", body : ""})
  const [showNewPost ,setShowNewPost] = useState(false)

  const showTaskandPost = () => {
    setShowRightSide((prevValue) => {
      return !prevValue;
    });
  };
  const showOtherData = () => {
    setOtherData((prevValue) => {
      return !prevValue;
    });
  };

  const createTask = async (e) =>
  {
    e.preventDefault()
    if(newTask.title == "") {
      alert("Please fill in the field")
    } else {
    let resp = await axios.post("http://jsonplaceholder.typicode.com/todos/", newTask);
    console.log(resp.data);
    alert("You have a new Task : \n" + "Title: " + newTask.title);
  }
  }

  const createPost = async (e) =>
  {
    e.preventDefault()
    if(newPost.title == "" || newPost.body == "") {
      alert("Please fill in the blanks")
    } else {
    let resp = await axios.post("http://jsonplaceholder.typicode.com/todos/", newPost);
    console.log(resp.data);
    alert("You have a new Post : \n" + "Title: " + newPost.title + "\n" + "Body: " + newPost.body);
  }}

  const deletePerson = (id) => {
    props.setUsers(prevPerson => {
      return prevPerson.filter((item ,index) => {
        return index !== props.id
      })
    })
  }

  const classtwo = () => {
      if(isExist === true) {
          return " " + "divLClick"
      } 
      return ""
}

const classone = () => {
    if(otherData === true) {
        return " " + "divLopen"
    }
    return ""
    }
const classtree = () => {
    if(otherData === true) {
        return " " + "divRopen"
    }
    return ""
    }
const classfour = () => {
    if(props.newUserbutton === true) {
        return " " + "divRnewuser"
    }
    return ""
    }

  const updateUser = async () =>
  {  if(userUpdate == "") {
      alert("The User not a need update")
  } else {
    let resp = await axios.put("http://jsonplaceholder.typicode.com/users/"+ props.user.id , userUpdate);
    console.log(resp.data);
    alert("Updated !! \n" + "Name : " + userUpdate.name + "\n" + "Email : " + userUpdate.email + "\n" + "Street : " + userUpdate.street + "\n" + "City : " + userUpdate.city + "\n" + "Zip Code : " + userUpdate.zipcode) 
  }}
  return (
    <div>
      <div
        key={props.user.id}
        className={"divL" + (classone() + "" + classtwo())}
        style={
        {border : "1px solid black"}
        }
      >
        <span onClick={showTaskandPost}>ID : {props.user.id}</span> <br />
        Name : <input defaultValue={props.user.name} name="name" onChange={e => setUserUpdate({... userUpdate , name : e.target.value})}/>
        <br />
        Email : <input defaultValue={props.user.email} name="email" onChange={e => setUserUpdate({... userUpdate , email : e.target.value})}/>
        <br />
        <input type="button" value="Other Data" className="other-data" onMouseOver={showOtherData} />
        {otherData && (
          <div>
            Street : <input defaultValue={props.user.address.street} name="street" onChange={e => setUserUpdate({... userUpdate , street : e.target.value})}/>
            <br />
            City : <input defaultValue={props.user.address.city} name="city" onChange={e => setUserUpdate({... userUpdate , city : e.target.value})}/>
            <br />
            Zip Code : <input defaultValue={props.user.address.zipcode} name="zipcode" onChange={e => setUserUpdate({... userUpdate , zipcode : e.target.value})}/>
            <br />
          </div>
        )}
        <input type="button" value="Delete" className={"Delete" + (otherData ? " " + "Delete-open" : "")} onClick={deletePerson} />
        <input type="button" value="Update" className={"Update" + (otherData ? " " + "Update-open" : "")}  onClick={updateUser} />
      </div>
      <div className={"divR" + (classtree() + " " + classfour())}>
        {isExist && (
          <div className="title-todo-title">
            <h3>Tasks - {props.user.name}</h3>
            <input value="Add" type="button" className="addtodo-post" onClick={() => setNewTodo(!newTodo)}/>
          </div>
        )}
        {
        isExist && (
          <div className="div4tasks">
            {newTodo ? 
            <div className="fromnewpost">
              <h3>Add New Todo</h3>
           <textarea type="text" placeholder="Task Title" name="title" onChange={e => setNewTask({...newTask, title : e.target.value})} className="newposttask" style={{width: "311px"}}/> <br/>
           <div className="divBtnpost-title">
           <input type="submit" value="Submit" className="addbtnButtons" onClick={createTask}/>
           <input type="button" value="Cancel" className="addbtnButtons" onClick={() => setNewTodo(!newTodo)}/>
           </div>
            </div>
            :
              props.todos
                .filter((x) => x.userId == props.user.id)
                .map((item, index) => {
                  return (
                    <TodoComp
                      key={index}
                      todos={item}
                    />
                  );
                })}
          </div>
        )}
        <div >
          {isExist && (
            <div className="title-todo-title">
              <h3>Posts - {props.user.name}</h3>
              <input value="Add" type="button" className="addtodo-post" onClick={() => setShowNewPost(!showNewPost)}/>
            </div>
          )}
          {isExist &&
          <div className="div4posts">
          {showNewPost ?
          <div className="fromnewpost">
            <h3>Add New Post</h3>
           <input className="newposttitle" type="text" placeholder="Title" name="title" onChange={e => setNewPost({...newPost, title : e.target.value})} /> <br/>
           <textarea className="newposttask" placeholder="Body" name="body" onChange={e => setNewPost({...newPost, body : e.target.value})} /> <br/>
           <input type="submit" value="Submit" className="addbtnButtons" onClick={createPost}/>
           <input type="button" value="Cancel" className="addbtnButtons" onClick={() => setShowNewPost(!showNewPost)}/>
          </div>
          :
            props.posts
              .filter((x) => x.userId == props.user.id)
              .map((item, index) => {
                return <PostComp key={index} posts={item} />;
              })}
              </div>
              }
        </div>
      </div>
    </div>
  );
};

export default UserComp;
