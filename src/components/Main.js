import React, {useEffect, useState} from 'react'
import './Main.css';
import {db} from '../firebase';
import * as firebase from 'firebase';
import { useParams } from "react-router-dom"

import Post from './Post'
import { Modal, Button, Carousel, Alert } from "react-bootstrap"

function converTime(firebaseTime){
  var time = new Date(firebaseTime.seconds*1000);
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  }
  return (time.toLocaleDateString('ru-RU', options))
}
export default function Main() {
  const [searchCategory, setSearchCategory] = useState("");
  const [city, setCity] = useState("");
  const [seachedWord, setSeachedWord] = useState("")
  const [jobList, setJobList] = useState([])
  const [showPostModal, setShowPostModal] = useState(false)
  const [postInfo, setPostInfo] = useState(false)
  const [dbCategories, setStateDbCategories] = useState([])
  const { category,type } = useParams();
  
  useEffect(() => {
    
    db.collection('categories').onSnapshot(snapshot => {
      // Get all jobs from firebase and set to jobs
      setStateDbCategories(snapshot.docs.map(doc=>doc.data()))
    })

    
    if (category == undefined && type == undefined){
      db.collection('jobs').orderBy("postedOn","desc").onSnapshot(snapshot => {
        // Get all jobs from firebase and set to jobs
        var newData = snapshot.docs.map(doc=>{
          var docData = doc.data()
          docData["id"] = doc.id;
          return docData
        })
        setJobList(newData)
      })
    }
    else if (category != undefined){
      db.collection('jobs').where("category", "==", category).onSnapshot(snapshot => {
        // Get all jobs from firebase and set to jobs
        var newData = snapshot.docs.map(doc=>{
          var docData = doc.data()
          docData["id"] = doc.id;
          return docData
        })
        setJobList(newData)
        
      })
    }
    else {
      console.log(type)
      db.collection('jobs').where("type", "==", type).onSnapshot(snapshot => {
        
        // Get all jobs from firebase and set to jobs
        var newData = snapshot.docs.map(doc=>{
          var docData = doc.data()
          docData["id"] = doc.id;
          return docData
        })
        setJobList(newData)
        
      })
    }
    
  }, []);
  
  
  return (
    <div>
      {/* header top menu option 1*/}
      {/* header top menu option 1 #end */}
      <div id="header" className="clearfix">
        <div id="header-in">
          <div className="h_left">
            <div className="logo">
              <h1 id="site-title" className="logo-image">
                <a href="/" title="Kel-Kel">
                  Kel-Kel
                </a>
              </h1>
            </div>
            <div className="description">
              "С нами легче найти работу в разных городах снг"
            </div>
          </div>
          {/*hleft end */}
          <ul>
            <li>
              <a href="https://api.whatsapp.com/send?phone=+996707701711" className="i_face">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#232C37"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.49999 16C7.49999 14.3189 7.99851 12.6755 8.9325 11.2777C9.86649 9.87984 11.194 8.79037 12.7472 8.14702C14.3004 7.50368 16.0094 7.33535 17.6583 7.66333C19.3071 7.9913 20.8217 8.80085 22.0104 9.98959C23.1991 11.1783 24.0087 12.6929 24.3367 14.3417C24.6646 15.9906 24.4963 17.6996 23.853 19.2528C23.2096 20.806 22.1202 22.1335 20.7223 23.0675C19.3245 24.0015 17.6811 24.5 16 24.5C14.3918 24.5029 12.8162 24.047 11.458 23.186C11.3372 23.1096 11.2014 23.0599 11.0597 23.0404C10.9181 23.021 10.774 23.0321 10.637 23.073L7.75699 23.932L8.84199 21.395C8.90506 21.2473 8.93162 21.0866 8.91944 20.9264C8.90725 20.7663 8.85668 20.6115 8.77199 20.475C7.93792 19.1316 7.49724 17.5813 7.49999 16ZM16 5.5C10.201 5.5 5.49999 10.201 5.49999 16C5.49999 17.838 5.97299 19.568 6.80499 21.073L5.07999 25.107C5.00533 25.2817 4.982 25.4741 5.01275 25.6617C5.04349 25.8492 5.12702 26.0241 5.25357 26.1658C5.38011 26.3076 5.54443 26.4104 5.72728 26.4621C5.91012 26.5139 6.10392 26.5124 6.28599 26.458L10.786 25.116C12.373 26.0255 14.1709 26.5027 16 26.5C21.799 26.5 26.5 21.799 26.5 16C26.5 10.201 21.799 5.5 16 5.5ZM18.293 18.182L16.978 19.108C16.2535 18.6912 15.5882 18.1789 15 17.585C14.3685 16.9544 13.8225 16.2437 13.376 15.471L14.211 14.762C14.385 14.6144 14.5033 14.4117 14.5462 14.1876C14.5891 13.9635 14.5541 13.7315 14.447 13.53L13.383 11.53C13.3122 11.3972 13.2123 11.282 13.0908 11.1932C12.9693 11.1044 12.8293 11.0441 12.6813 11.0169C12.5332 10.9897 12.381 10.9962 12.2358 11.0361C12.0907 11.0759 11.9564 11.148 11.843 11.247L11.527 11.522C10.768 12.184 10.319 13.272 10.691 14.374C11.2895 16.1171 12.2799 17.6997 13.586 19C15.399 20.813 17.241 21.527 18.319 21.805C19.187 22.028 20.008 21.729 20.587 21.257L21.178 20.775C21.3026 20.6734 21.4009 20.5432 21.4645 20.3956C21.5281 20.2479 21.5551 20.0871 21.5433 19.9268C21.5316 19.7664 21.4813 19.6113 21.3968 19.4745C21.3123 19.3377 21.1961 19.2233 21.058 19.141L19.38 18.141C19.2141 18.042 19.023 17.9932 18.8299 18.0004C18.6368 18.0077 18.45 18.0708 18.292 18.182H18.293Z" fill="white"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.fb.com" className="i_twitter">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#232C37"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 10C6 8.93913 6.42143 7.92172 7.17157 7.17157C7.92172 6.42143 8.93913 6 10 6H22C23.0609 6 24.0783 6.42143 24.8284 7.17157C25.5786 7.92172 26 8.93913 26 10V22C26 23.0609 25.5786 24.0783 24.8284 24.8284C24.0783 25.5786 23.0609 26 22 26H10C8.93913 26 7.92172 25.5786 7.17157 24.8284C6.42143 24.0783 6 23.0609 6 22V10ZM10 8C9.46957 8 8.96086 8.21071 8.58579 8.58579C8.21071 8.96086 8 9.46957 8 10V22C8 22.5304 8.21071 23.0391 8.58579 23.4142C8.96086 23.7893 9.46957 24 10 24H16V17H15C14.7348 17 14.4804 16.8946 14.2929 16.7071C14.1054 16.5196 14 16.2652 14 16C14 15.7348 14.1054 15.4804 14.2929 15.2929C14.4804 15.1054 14.7348 15 15 15H16V13.5C16 12.5717 16.3687 11.6815 17.0251 11.0251C17.6815 10.3687 18.5717 10 19.5 10H20.1C20.3652 10 20.6196 10.1054 20.8071 10.2929C20.9946 10.4804 21.1 10.7348 21.1 11C21.1 11.2652 20.9946 11.5196 20.8071 11.7071C20.6196 11.8946 20.3652 12 20.1 12H19.5C19.303 12 19.108 12.0388 18.926 12.1142C18.744 12.1896 18.5786 12.3001 18.4393 12.4393C18.3001 12.5786 18.1896 12.744 18.1142 12.926C18.0388 13.108 18 13.303 18 13.5V15H20.1C20.3652 15 20.6196 15.1054 20.8071 15.2929C20.9946 15.4804 21.1 15.7348 21.1 16C21.1 16.2652 20.9946 16.5196 20.8071 16.7071C20.6196 16.8946 20.3652 17 20.1 17H18V24H22C22.5304 24 23.0391 23.7893 23.4142 23.4142C23.7893 23.0391 24 22.5304 24 22V10C24 9.46957 23.7893 8.96086 23.4142 8.58579C23.0391 8.21071 22.5304 8 22 8H10Z" fill="white"/>
                </svg>

              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" className="i_rss">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#232C37"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 10C6 8.93913 6.42143 7.92172 7.17157 7.17157C7.92172 6.42143 8.93913 6 10 6H22C23.0609 6 24.0783 6.42143 24.8284 7.17157C25.5786 7.92172 26 8.93913 26 10V22C26 23.0609 25.5786 24.0783 24.8284 24.8284C24.0783 25.5786 23.0609 26 22 26H10C8.93913 26 7.92172 25.5786 7.17157 24.8284C6.42143 24.0783 6 23.0609 6 22V10ZM10 8C9.46957 8 8.96086 8.21071 8.58579 8.58579C8.21071 8.96086 8 9.46957 8 10V22C8 22.5304 8.21071 23.0391 8.58579 23.4142C8.96086 23.7893 9.46957 24 10 24H22C22.5304 24 23.0391 23.7893 23.4142 23.4142C23.7893 23.0391 24 22.5304 24 22V10C24 9.46957 23.7893 8.96086 23.4142 8.58579C23.0391 8.21071 22.5304 8 22 8H10ZM16 13C15.2044 13 14.4413 13.3161 13.8787 13.8787C13.3161 14.4413 13 15.2044 13 16C13 16.7956 13.3161 17.5587 13.8787 18.1213C14.4413 18.6839 15.2044 19 16 19C16.7956 19 17.5587 18.6839 18.1213 18.1213C18.6839 17.5587 19 16.7956 19 16C19 15.2044 18.6839 14.4413 18.1213 13.8787C17.5587 13.3161 16.7956 13 16 13ZM11 16C11 14.6739 11.5268 13.4021 12.4645 12.4645C13.4021 11.5268 14.6739 11 16 11C17.3261 11 18.5979 11.5268 19.5355 12.4645C20.4732 13.4021 21 14.6739 21 16C21 17.3261 20.4732 18.5979 19.5355 19.5355C18.5979 20.4732 17.3261 21 16 21C14.6739 21 13.4021 20.4732 12.4645 19.5355C11.5268 18.5979 11 17.3261 11 16ZM21.5 12C21.8978 12 22.2794 11.842 22.5607 11.5607C22.842 11.2794 23 10.8978 23 10.5C23 10.1022 22.842 9.72064 22.5607 9.43934C22.2794 9.15804 21.8978 9 21.5 9C21.1022 9 20.7206 9.15804 20.4393 9.43934C20.158 9.72064 20 10.1022 20 10.5C20 10.8978 20.158 11.2794 20.4393 11.5607C20.7206 11.842 21.1022 12 21.5 12Z" fill="white"/>
                </svg>

              </a>
            </li>
            <li>
              <a href="mailto:meerbek.kg@gmail.com" className="i_email">
                <i className="fa fa-envelope-o" />
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#232C37"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M24 8H8C6.9 8 6.01 8.9 6.01 10L6 22C6 23.1 6.9 24 8 24H24C25.1 24 26 23.1 26 22V10C26 8.9 25.1 8 24 8ZM8 12L16 17L24 12V22H8V12ZM8 10L16 15L24 10H8Z" fill="white"/>
                </svg>

              </a>
            </li>
          </ul>
          {/* widget #end */}
        </div>
        {/*header in end */}
      </div>
      {/*header end */}
      <div id="search_section">
        <div id="search_section-in" className="clearfix">
          <div id="search">
            <form method="get" id="searchform" action="./jobboard/">
              <div className="textfeild_bg">
                <input
                  type="text"
                  placeholder="Что ищете?"
                  name="searchedWord"
                  id="searchedWord"
                  className="searchjob"
                  value={seachedWord}
                  onChange={event=>setSeachedWord(event.target.value)}
                />
                <select className="category" name="category" id="category" onChange={event=>setSearchCategory(event.target.value)}>
                  <option disabled >Категория</option>
                  {dbCategories.map((category,index) => {
                    return (
                      <option value={category.name}>{category.name}</option>
                    )
                  })}
                </select>
                <select className="city" id="city" name="city" onChange={event=>setCity(event.target.value)}>
                  <option disabled >Город</option>
                  <option value="Бишкек">Бишкек</option>
                  <option value="Москва">Москва</option>
                  <option value="Санкт-Петербург">Санкт-Петербург</option>
                  <option value="Казань">Казань</option>
                  <option value="Новосибирск">Новосибирск</option>
                  <option value="Краснодар">Краснодар</option>
                  <option value="Красноярск">Красноярск</option>
                </select>
              </div>
              <div className="submit_bg">
                <button className="sgo">Искать</button>
              </div>
              <div className="clear" />
            </form>
          </div>
          {/* header top menu option 2*/}
          <div id="secondary-menu" className="menu">
            <ul id="menu-top-menu" className="menu">
              <li className="menu-item">
                <a href="/">Все ваканcии</a>
              </li>
              <li className="menu-item">
                <a href="./jobboard/?page=resume">Ищут работу</a>
              </li>
              <li className="menu-item">
                <a href="./jobboard/?page=resume">Ищу персонал</a>
              </li>
              
            </ul>
          </div>
          {/* header top menu option 2 #end */}
        </div>
      </div>
      <div id="main_tab">
        <div id="main_tab-in">
          <ul id="tab">
          <li className={type==undefined?"page_item current_page_item":"page_item"}>
              <a href="/">Все</a>
            </li>
            <li className={type=="На постоянной основе"?"page_item current_page_item":"page_item"}>
              <a href="/type/На постоянной основе">На постоянной основе</a>
            </li>
            <li className={type=="Неполная занятость"?"page_item current_page_item":"page_item"}>
              <a href="/type/Неполная занятость">Неполная занятость</a>
            </li>
            <li className={type=="Удаленна работа"?"page_item current_page_item":"page_item"}>
              <a href="/type/Удаленна работа">Удаленна работа</a>
            </li>
          </ul>
          <div className="b_postajob">
            <a href="https://api.whatsapp.com/send?phone=+996707701711&text=Здраствуйте, я бы хотел добавить вакансию на сайте kelkel.ru">Добавить ВАКАНСИЮ</a>
          </div>
          
          <div className="clear" />
        </div>
      </div>
      {/* main tab #end */}
      <div className="category_list">
        <div className="category_list-in">
          <ul>
            <li className="bnone">
              <strong>Категории : </strong>
            </li>
            {dbCategories.map((category,index) => {
                return (
                  <li className="cat-item  cat-item-3">
                    <a href={"/category/"+category.name}>{category.name}</a>
                  </li>
                )
              })}
          </ul>
          <div className="clear" />
        </div>
        <div className="clear" />
      </div>
      {/* category_list */}
      <div id="page">
        <div id="content-wrap" className="clear right-side">
          <div id="content">
            <h2>
              Все ваканcии <span className="lblue" />
            </h2>
            <div className="list">
              {
              jobList.map((job,index) => {
                return (
                  <div key={index} className="listings" id={"listing_"+index}>
                    <img
                        src={job.imageUrl}
                        border={0}
                        className="company_logo"
                    />
                    <div className="featured-data">
                      <h3>
                        <span className="company_name">
                          <strong>{job.title}</strong> 
                        </span>
                        <span className="salary">{job.salary}</span>
                        <span> <span className="insideSpan">#{job.category}</span> <span className="insideSpan" style={{color:'blue'}}>
                          <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.78571C0 2.74499 2.45929 0.285706 5.5 0.285706C8.54071 0.285706 11 2.74499 11 5.78571C11 9.91071 5.5 16 5.5 16C5.5 16 0 9.91071 0 5.78571ZM3.53571 5.78571C3.53571 6.86999 4.41571 7.74999 5.5 7.74999C6.58429 7.74999 7.46429 6.86999 7.46429 5.78571C7.46429 4.70142 6.58429 3.82142 5.5 3.82142C4.41571 3.82142 3.53571 4.70142 3.53571 5.78571Z" fill="black" fill-opacity="0.54"/>
                          </svg> 
                          {job.location}</span> <span className="insideSpan"><svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.57143 0H9.14286V1.52381H4.57143V0ZM6.09524 9.90476V5.33333H7.61905V9.90476H6.09524ZM12.2133 4.86857L13.2952 3.78667C12.9676 3.3981 12.6095 3.03238 12.221 2.71238L11.139 3.79429C9.9581 2.84952 8.47238 2.28571 6.85714 2.28571C3.07048 2.28571 0 5.35619 0 9.14286C0 12.9295 3.06286 16 6.85714 16C10.6514 16 13.7143 12.9295 13.7143 9.14286C13.7143 7.52762 13.1505 6.0419 12.2133 4.86857ZM1.52381 9.14286C1.52381 12.0914 3.90857 14.4762 6.85714 14.4762C9.80571 14.4762 12.1905 12.0914 12.1905 9.14286C12.1905 6.19429 9.80571 3.80952 6.85714 3.80952C3.90857 3.80952 1.52381 6.19429 1.52381 9.14286Z" fill="black" fill-opacity="0.54"/> </svg>                        
                            {converTime(job.postedOn)}</span> 
                          </span>
                      </h3>
                      <span className="date">
                        <small className="job-Part red" onClick={()=>{setPostInfo(job);setShowPostModal(true)}}>ПОДРОБНЕЕ... </small> 
                        <small className="job-Part black">НАПИСАТЬ </small> 
                      </span>
                    </div>
                    <div className="clear" />
                    {/*Post Meta*/}
                  </div>
                )
              })
              }
              </div>
              <Modal size="lg" closeButton show={showPostModal} onHide={()=>setShowPostModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>{postInfo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Post job={postInfo} />
                </Modal.Body>
                
              </Modal>
            {/* Prev/Next page navigation */}
            <div className="pagenavi">
              <div className="wp-pagenavi">
                <a className="on">1</a>
                <a href="./jobboard/page/2/" className="single_page" title={2}>
                  <strong>2</strong>
                </a>
                <a href="./jobboard/page/3/" className="single_page" title={3}>
                  <strong>3</strong>
                </a>
                <a href="./jobboard/page/2/" className="nextpostslink">
                  <strong>»</strong>
                </a>
              </div>
            </div>

            {/*page navi end */}
          </div>
          
          <div id="sidebar">
            
            <div className="sidebanner">
              <div className="Sponsors">
                <a href="">
                  
                  
                </a>
                <Carousel>
                    <Carousel.Item>
                    <img
                    src="https://q3p9g6n2.rocketcdn.me/wp-content/ml-loads/2016/08/google-adsense-icon5-1920-800x450.jpg"
                    alt=""
                    className="ads"
                  />
                    </Carousel.Item>
                    <Carousel.Item>
                    <img
                    src="https://q3p9g6n2.rocketcdn.me/wp-content/ml-loads/2016/08/google-adsense-icon5-1920-800x450.jpg"
                    alt=""
                    className="ads"
                  />
                    </Carousel.Item>
                    <Carousel.Item>
                    <img
                    src="https://q3p9g6n2.rocketcdn.me/wp-content/ml-loads/2016/08/google-adsense-icon5-1920-800x450.jpg"
                    alt=""
                    className="ads"
                  />
                    </Carousel.Item>
                  </Carousel>
              </div>
            </div>
            <ul>
              <li className="widget">
                <h3>
                  <span>О нас</span>
                </h3>
                <div className="textwidget">
                  Мы агентство Келкел помогаем с легкостю найти работу или сотрудников для вашей компаний.
                  Работа в СНГ свежие и актуальные вакансии на 2021 год.
                  Здесь вы сможете найти работу по своей специальности, а так же разместить своё #резюме для работодателей. У нас есть много интересных вакансий и резюме для тех, кто занимается поиском кандидатов в Кыргызстане и подбором персонала для компаний.
                  Вакансии по городам #Москва,#Санк-Петербург, #Бишкек,#Ош от прямых работодателей и кадровых агентств.
                  Удачи в поиске работы!
                </div>
              </li>
            </ul>
            <ul><li className="widget">
                <h3>
                  <span>Лучшие компании</span>
                </h3>
                  <ul className="featured_companies">
                  <li><a href="#"><img src="https://demo.templatic.com/jobboard/wp-content/themes/JobBoard2/images/dummy/logo1.png " alt="https://demo.templatic.com/jobboard/wp-content/themes/JobBoard2/images/dummy/logo1.png " /></a></li>
                  <li><a href="#"><img src="https://demo.templatic.com/jobboard/wp-content/themes/JobBoard2/images/dummy/logo2.png " alt="https://demo.templatic.com/jobboard/wp-content/themes/JobBoard2/images/dummy/logo2.png " /></a></li>
                  <li><a href="#"><img src="https://demo.templatic.com/jobboard/wp-content/themes/JobBoard2/images/dummy/logo3.png " alt="https://demo.templatic.com/jobboard/wp-content/themes/JobBoard2/images/dummy/logo3.png " /></a></li>
                  <li><a href="#"><img src="https://demo.templatic.com/jobboard/wp-content/themes/JobBoard2/images/dummy/logo4.png " alt="https://demo.templatic.com/jobboard/wp-content/themes/JobBoard2/images/dummy/logo4.png " /></a></li>
                </ul>
              </li></ul>
          </div>
          {/*Sidebar right*/}
        </div>
      </div>
      {/*content-wrap end */}
      <div id="footer" className="clearfix">
        <div id="footer-in">
          <div id="flinks">
            <ul id="menu-footer-menu" className="menu">
              <li
                id="menu-item-36205"
                className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-36205"
              >
                <a href="/">Home</a>
              </li>
              <li
                id="menu-item-36206"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-36206"
              >
                <a href="./jobboard/pagetemplates/sitemap/">Site Map</a>
              </li>
              <li
                id="menu-item-36207"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-36207"
              >
                <a href="./jobboard/pagetemplates/map/">Map</a>
              </li>
              <li
                id="menu-item-36208"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-36208"
              >
                <a href="./jobboard/pagetemplates/contactus/">Contact Us</a>
              </li>
            </ul>
          </div>
          <a href="/admin">Copyright 2020 © Kel-Kel All rights reserved.</a>
        </div>
        {/*footer-in end*/}
      </div>
    </div>
  );
}
