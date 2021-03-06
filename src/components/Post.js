import React, {useState,useEffect} from 'react';
import {db} from '../firebase';
import {Carousel} from "react-bootstrap"

function converTime(firebaseTime){
  var time = new Date(firebaseTime.seconds*1000);
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  }
  return (time.toLocaleDateString('ru-RU', options))
}
function createMarkup(html) {
  return {__html: html};
}
export default function Post({ job }) {
  const [jobList, setJobList] = useState([])
  useEffect(() => {
    db.collection('jobs').where("category", "==", job.category).onSnapshot(snapshot => {
      // Get all jobs from firebase and set to jobs
      var newData = snapshot.docs.map(doc=>{
        var docData = doc.data()
        docData["id"] = doc.id;
        return docData
      })
      setJobList(newData)
      
    })
  },[])
  
  return (
    <div className="newlisting newlisting-block">
      
      <div className="posted-date">
        Категория                <a href="/jobboard/jcategory/mobile/" rel="tag">{job.category}</a>				                
        <span className="post-date"><i className="fa fa-calendar-o" /> {converTime(job.postedOn)}</span>
      </div>
      <div className="detail_list">
        <a href="/jobboard/job/mobile-wordpress-developer/" className="img"><img src={job.imageUrl} width={100} height={100} border={0} className="company_logo" /></a>
        <div className="col_right">
          <h2>{job.org_name}</h2>
          <p><span>Email:</span></p><p className="text-width"> {job.org_email}</p>					 
          <p><span>Тип работы</span></p><p className="text-width"> {job.type}</p>					 
          <p><span>Город</span></p><p className="text-width"> {job.location}</p>					 
          <p><span>Адрес</span></p><p className="text-width"> {job.address}</p>					 					 					      
        </div>
        <div className="clear" />
      </div>
      <h4> Описание : </h4>
      <div dangerouslySetInnerHTML={createMarkup(job.description)}></div>

      {/* {job.description} */}
      {/*Post Meta*/}

      
        

      <div className="post_bottom apply">
        <div className="apply-in customCarousel">
          <h4>Похожие ваканcии : </h4>
          
           <Carousel>
            {
              jobList.map((job,index) => {
                return (
                <Carousel.Item>
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
                        <span>{job.salary}</span>
                        <span> <span className="insideSpan">#{job.category}</span> <span className="insideSpan" style={{color:'blue'}}>
                          <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.78571C0 2.74499 2.45929 0.285706 5.5 0.285706C8.54071 0.285706 11 2.74499 11 5.78571C11 9.91071 5.5 16 5.5 16C5.5 16 0 9.91071 0 5.78571ZM3.53571 5.78571C3.53571 6.86999 4.41571 7.74999 5.5 7.74999C6.58429 7.74999 7.46429 6.86999 7.46429 5.78571C7.46429 4.70142 6.58429 3.82142 5.5 3.82142C4.41571 3.82142 3.53571 4.70142 3.53571 5.78571Z" fill="black" fill-opacity="0.54"/>
                          </svg> 
                          {job.location}</span> <span className="insideSpan"><svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.57143 0H9.14286V1.52381H4.57143V0ZM6.09524 9.90476V5.33333H7.61905V9.90476H6.09524ZM12.2133 4.86857L13.2952 3.78667C12.9676 3.3981 12.6095 3.03238 12.221 2.71238L11.139 3.79429C9.9581 2.84952 8.47238 2.28571 6.85714 2.28571C3.07048 2.28571 0 5.35619 0 9.14286C0 12.9295 3.06286 16 6.85714 16C10.6514 16 13.7143 12.9295 13.7143 9.14286C13.7143 7.52762 13.1505 6.0419 12.2133 4.86857ZM1.52381 9.14286C1.52381 12.0914 3.90857 14.4762 6.85714 14.4762C9.80571 14.4762 12.1905 12.0914 12.1905 9.14286C12.1905 6.19429 9.80571 3.80952 6.85714 3.80952C3.90857 3.80952 1.52381 6.19429 1.52381 9.14286Z" fill="black" fill-opacity="0.54"/> </svg>                        
                            {converTime(job.postedOn)}</span> 
                          </span>
                      </h3>
                    </div>
                    <div className="clear" />
                  </div>
                </Carousel.Item>
                )
              })
            }
            
          </Carousel> 
        </div>
      </div>
      {/*include comments template*/}
      {/* <div className="row">
        <div className="title_space">
          <div className="title-container">
            <h3><span>Location On Map</span></h3>
            <div className="clearfix" />
          </div>
        </div>
      </div> */}
      
    </div>

  )
}
