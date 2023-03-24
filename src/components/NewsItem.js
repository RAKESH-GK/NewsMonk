import React from 'react'

const NewsItem =(props)=>{
    let {title,description,imgUrl,newsUrl,author,publishedAt,source}=props;
    return (
      <div>
        <div className="card mb-3">
        <span className="position-absolute  translate-left badge rounded bg-danger" style={{top:'2%',left:'2%'}}>{source}</span>
            <img src={imgUrl?imgUrl:"https://c.ndtvimg.com/2023-03/qsr0l48o_google-doodle-celebrates-mario-molina_625x300_19_March_23.jpg"} className="card-img-top" type="image/webp" alt="..."/>
            <div className={`card-body bg-${props.mode} text-${(props.mode)==="light"?"dark":"light"}`}>
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className={`text-${(props.mode)==="light"?"dark":"light"}`}>By {author?author:"Unknown"} on {new Date(publishedAt).toGMTString() }</small></p>
              <a href={newsUrl}  className={`btn btn-sm btn-${(props.mode)==="light"?"primary":"warning"}`}>Read more</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem
