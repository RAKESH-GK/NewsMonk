import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


export class News extends Component {
  page = 1;
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
  }
  static propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      totalResults: 0
    }
    document.title = `NewsMonk - ${this.capitalize(this.props.category)}`;
  }
  
  async updatenews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.props.setProgress(70);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  componentDidMount() {
    this.updatenews();
  }

  fetchMoreData=async()=>{
    this.page=this.page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
    })


  }

  // handlePrevious=()=>{
  //   this.page=this.page-1;
  //   this.updatenews();
  // }

  // handleNext=()=>{
  //   this.page=this.page+1;
  //   this.updatenews();
  // }

  render() {
    return (
      <>
        <h1 className={`my-4 text-center text-${(this.props.mode) === "light" ? "dark" : "light"}`}> NewsMonk - Top {this.capitalize(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>
            <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} mode={this.props.mode} toggleMode={this.props.toggleMode} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
      </>
      // <div className="container my-4">
      //   <h1 className={`my-4 text-center text-${(this.props.mode)==="light"?"dark":"light"}`}> NewsMonk - Top {this.capitalize(this.props.category)} Headlines</h1>
      //   {this.state.loading && <Spinner/>}
      //   <div className="row">
      //     {!this.state.loading && this.state.articles.map((element)=>{
      //       return  <div className="col-md-4" key={element.url}>
      //               <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} mode={this.props.mode} toggleMode={this.props.toggleMode} author={element.author} publishedAt={element.publishedAt} source={element.source.name}/>
      //               </div>
      //     })}
      //   </div>
      //  <div className="container d-flex justify-content-center justify-content-md-end">
      //     <button disabled={this.page<=1} onClick={this.handlePrevious} type="button" className='btn btn-primary'>&larr; Previous</button>
      //     <button disabled={(this.page) +1 >(Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" onClick={this.handleNext} className='btn btn-primary mx-1'> Next &rarr;</button>
      //   </div> 
      //  </div>

    )
  }
}
export default News

