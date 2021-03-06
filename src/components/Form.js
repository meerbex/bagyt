import React, {Component, useRef, useEffect, useState} from 'react'
import {db,storage} from '../firebase';
import JoditEditor from "jodit-react";
import * as firebase from 'firebase';

export default function Form(props) {
  const [address, setAddress] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [org_email, setOrg_email] = useState("")
  const [org_phone, setOrg_phone] = useState("");
  const [org_name, setOrg_name] = useState("");
  const [salary, setSalary] = useState("")
  const [title, setTitle] = useState("")
  const [type, setType] = useState("На постоянной основе")
  const [dbCategories, setStateDbCategories] = useState([])
  const [validated, setValidated] = useState({})
  const editor = useRef(null)
	
  useEffect(() => {
    db.collection('categories').onSnapshot(snapshot => {
      // Get all jobs from firebase and set to jobs
      setStateDbCategories(snapshot.docs.map(doc=>doc.data()))
    })
  }, []);
  function handleSubmit(e){
    e.preventDefault();
    createPost();
  }
  function handleImageChange(e){
    console.log(URL.createObjectURL(e.target.files[0]))
    setImagePreviewUrl(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])
  }

  
  
  function createPost (){
    var sedingData = {
      address: address,
      category: category,
      description: description,
      imageUrl:"https://firebasestorage.googleapis.com/v0/b/bagyt-9d3ec.appspot.com/o/images%2Fno-image.png?alt=media&token=f441b092-8a19-48a1-8e51-823a362bbd22",
      location: location,
      org_email: org_email,
      org_name: org_name,
      org_phone: org_phone,
      postedOn: new Date(),
      salary: salary,
      type: type,
      title: title
    };

    
    
    // sending image first
    if (image!=null){
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(image.name).getDownloadURL()
        .then(fireBaseUrl => {
          sedingData.imageUrl = fireBaseUrl
          saveAll(sedingData)
        })
      })
      
    }else {
      saveAll(sedingData)
    }
    
  }
  function saveAll (data){
    db.collection("jobs").add(data).then(() => {
        console.log("Created successfully deleted!");
        props.setIsSuccessCreated(true)
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  }
  
  return (
    <>
    <form id="content" className="content" onSubmit={handleSubmit}>
      
      
      <div id="jobform" className="submit_job_form">
        
        <p className="mandatory fr"> <span className="required">*</span> означает обязательное поле </p>
          <h4 className="sub_head">Информация о ваканcии</h4>
          
          <div className="form_row clearfix">
            <label className="lab2">Название поста<span className="required">*</span> </label>
            <input type="text" className="textfield slog_prop" onChange={e=>setTitle(e.target.value)} value={title} id="title" name="title" required />
          </div>

          <div className="form_row clearfix">
            <label className="lab2">Описание поста<span className="required">*</span> </label>
            <div  className="textfield slog_prop">
            <JoditEditor
            	ref={editor}
                value={description}
		            tabIndex={1} // tabIndex of textarea
		            onChange={newContent => setDescription(newContent)}// preferred to use only this option to update the content for performance reasons
            />
            
             </div>
          </div>
          
          <div className="form_row clearfix">
            <label className="lab2">Категория<span className="required">*</span> </label>
            
            <select className="textfield slog_prop" defaultValue="none" name="radius" onChange={e=>setCategory(e.target.value)} required>
              <option disabled value="none">Выберите категорию</option>
              {dbCategories.map((category,index) => {
                return (
                  <option key={index} >{category.name}</option>
                )
              })}
				    </select>
          </div>
          <div className="form_row clearfix">
            <label className="lab2">Фото</label>
            <div className="textfield slog_prop">
              {imagePreviewUrl?<img src={imagePreviewUrl} style={{width:200}} />:<></>}
              <input type="file" className="textfield slog_prop" onChange={e=>handleImageChange(e)} id="image" />
         
            </div>
          </div>
          <div className="form_row clearfix">
            <label className="lab2">З/П<span className="required">*</span> </label>
            <input type="text" className="textfield slog_prop" onChange={e=>setSalary(e.target.value)} value={salary} id="salary" name="salary" required/>
          </div>
          <div className="form_row clearfix">
            <label className="lab2">Город<span className="required">*</span> </label>
            <input type="text" className="textfield slog_prop" onChange={e=>setLocation(e.target.value)} value={location} id="location" name="location" required />
          </div>
          <div className="form_row clearfix">
            <label className="r_lbl">Тип работы</label>
            <div className="form_cat_right" style={{display: 'flex'}}>
              <div className="form_cat ">
                <label className="r_lbl" htmlFor="job_type_1">
                  <input name="job_type"  checked={ type == "На постоянной основе" }  id="job_type_1" onChange={e=>setType("На постоянной основе")} type="radio" defaultValue="На постоянной основе" />     На постоянной основе
                </label>
              </div>  
              <div className="form_cat ">
                <label className="r_lbl" htmlFor="job_type_2">
                  <input name="job_type" id="job_type_2" type="radio" onChange={e=>setType("Неполная занятость")} defaultValue="Неполная занятость" /> Неполная занятость
                </label>
              </div>
              <div className="form_cat ">
                <label className="r_lbl" htmlFor="job_type_3">
                  <input name="job_type" id="job_type_3" type="radio" onChange={e=>setType("Удаленна работа")} defaultValue="Удаленна работа" /> Удаленна работа
                </label>
              </div>
            </div>             
          </div>


          
        <h4 className="sub_head">Информация об организации и компании</h4>
        <div name="loginform" className="sublog_prop prop_sub_login" id="login_user_frm_id" method="post">
          <div className="form_row clearfix">
            <label className="lab2">Название организации<span className="required">*</span> </label>
            <input type="text" className="textfield slog_prop" onChange={e=>setOrg_name(e.target.value)} value={org_name} id="org_name" name="org_name" required/>
          </div>
          <div className="form_row clearfix">
            <label className="lab2">Адрес<span className="required">*</span></label>
            <input type="text" className="textfield slog_prop " onChange={e=>setAddress(e.target.value)} value={address} id="address" name="address" required/>
          </div>
          <div className="form_row clearfix">
            <label className="lab2">Номер телефона организации<span className="required">*</span> </label>
            <input type="text" className="textfield slog_prop" onChange={e=>setOrg_phone(e.target.value)} value={org_phone} id="org_name" name="org_name" required/>
          </div>
          <div className="form_row clearfix">
            <label className="lab2">Электронная почта организации<span className="required">*</span> </label>
            <input type="text" className="textfield slog_prop" onChange={e=>setOrg_email(e.target.value)} value={org_email} id="org_email" name="org_email" />
          </div>
          <button className="btn_input_normal btn_spacer" type="submit">Сохранить</button>
        </div>
        
        
      </div>
     </form>

    </>
    );
}
