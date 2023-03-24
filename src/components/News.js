import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"




const News =(props)=> {
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  document.title = `NewsMonk - ${capitalize(props.category)}`;

  const [page,setPage]=useState(1);
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(false);
  const [totalResults,setTotalResults]=useState(0);
    
    
  const updatenews=async()=> {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    props.setProgress(30);
    let data = await fetch(url);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    updatenews()
    // eslint-disable-next-line
  },[]);
  
  const fetchMoreData=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults)
    
  }

  return (
    <>
      <h1 className={`text-center text-${(props.mode) === "light" ? "dark" : "light"}`} style={{marginTop:'80px',marginBottom:'30px'}}> NewsMonk - Top {capitalize(props.category)} Headlines</h1>
      {loading && <Spinner/>}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner/>}>
          <div className="container">
        <div className="row">
          {articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} mode={props.mode} toggleMode={props.toggleMode} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>
        </div>
      </InfiniteScroll>
    </>
    )
}
News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}
News.propTypes = {
  name: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News


